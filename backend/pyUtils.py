import os


from anytree import Node, RenderTree
from anytree.exporter import JsonExporter

import pymongo
import json



client = pymongo.MongoClient("localhost", 27017)
db = client.monkerDb0
collectionTrees = db['trees']






def threeDigitToPercentage(val):
    if (val[0] == "0"):
        return val[1:] + "%"
    return val + "%"


#       If it starts with 40, the next 3 numbers are the raise size in %, otherwise:

# 0 = Fold
# 1 =  Call
# 2 = Pot
# 3 = All In
# 4 = Half Pot
# 9 = 75% Pot
# or
# Number - 11 = Raise Size


# Monker refers to blinds as chips. In all our sims the SB = 1 Chip.
# Raise sizes are always additional to the previous bet.
# Example: Open 3sb, means open 3sb + 2sb(big blind) = 5sb, so open 2.5bb.
# Example: 3bet 12sb, If the open was to 5sb then the reraise is to 17sb (12+5)
# Here is the formula Monker uses for raise sizes.
# Raise % x (all previous bets + previous bet) + previous bet
# Example:
# Blinds 1/2.
# Open raise 50%
# 0.50(1+2+2) + 2 = 4.5
# Raise to 4.5
# 3bet 75%
# 0.75(1+2+4.5+4.5) + 4.5 = 13.5
# 3bet to 13.5

def chipsInBlinds(raiseInChips,sb, bb):
    return raiseInChips/bb

def raiseNodeToBbs(threeDigitPercentage,sb, bb, antes, nRaises,pos,prevActionList):
    if threeDigitPercentage[0] == "0":
        threeDigitPercentage = threeDigitPercentage[1:]
    raiseSizeFrac = float(threeDigitPercentage)/100

    #todo later if pos sb or bb?

    
    #if 2-bet
    firstRaise = True
    callSum = 0
    prevRaiseSizeList = []
    for a in prevActionList:
        if 'raise' in a or 'all-in' in a:
            firstRaise=False
            #huom muunto taas bb->chips
            prevRaiseSizeList.append(float(a.split(" ")[2])*bb)
        #lasketaan kaikki kuollut raha maksuista yhteen
        if 'call' in a:
            #jos on reissattu, maksun koko vika raise bb:nä
            if (len(prevRaiseSizeList) > 0):
                callSum += prevRaiseSizeList[-1]*bb
            #muuten maksu on 1bb (pl. sb/bb)
            else:
                if (pos == 'SB'):
                    callSum += sb
                else: 
                    callSum += bb


    raiseInChips = 0

    if (firstRaise):
        # Raise % x (all previous bets + previous bet) + previous bet
        # Open raise 50%
        # 0.50(1+2+2) + 2 = 4.5
        raiseInChips = raiseSizeFrac*(callSum+sb+bb+antes+bb)+bb

        if (pos == 'SB'):
            raiseInChips = raiseSizeFrac*(callSum+bb+antes+bb)+bb
        elif (pos == 'BB'):
            raiseInChips = raiseSizeFrac*(callSum+sb+antes+bb)+bb

        raiseInBbs = chipsInBlinds(raiseInChips,sb,bb)
        #print("chips,bbs", raiseInChips,raiseInBbs)
        #print(raiseSizeFrac*(sb+bb+antes+bb))
         

    else:
        #otetaan selvää potin koko, taas poikkeus jos sb tai bb reissannut aikasemmin (info on kyllä prevActionListissä!)
        pot = sb+bb+antes+callSum
        for raiseSize in prevRaiseSizeList:
            pot += raiseSize
        
        #Raise % x (all previous bets + previous bet) + previous bet
        raiseInChips = raiseSizeFrac*(pot+prevRaiseSizeList[-1])+prevRaiseSizeList[-1]
        raiseInBbs = chipsInBlinds(raiseInChips,sb,bb)

    #print("Pos", pos, "Raise in bbs",round(raiseInBbs,2), "prevActionList", prevActionList)
    # print("raiseInchips, raiseInBbs, pos, raiseSizeFrac, prevRaiseSizeList,callSum")
    # print(raiseInChips,raiseInBbs, pos, raiseSizeFrac, prevRaiseSizeList,callSum)
    return round(raiseInBbs,2)




def numberToAction(latestNode, sb, bb, antes, nRaises,pos,prevActionList):
    if latestNode == '0':
        return 'fold'
    elif latestNode == '1':
        return 'call'
    elif latestNode == '2':
        return 'raise 100% pot'
    elif (latestNode[:2] == '40' and len(latestNode) == 5):
        return 'raise ' + str(raiseNodeToBbs(latestNode[2:],sb, bb, antes, nRaises,pos,prevActionList)) + ' bb'
        #return 'raise ' + str(threeDigitToPercentage(latestNode[2:]))
    elif latestNode == '3':
        return 'all-in'
    elif latestNode == '4':
        return 'raise 50% pot'
    elif latestNode == '9':
        return 'raise 75% pot'
    elif latestNode == '6':
        return 'min-raise'
    elif (latestNode[0] == '1' and len(latestNode) >= 2):
        raiseInChips = int(latestNode[1:]) + 1
        return 'raise ' + str(chipsInBlinds(raiseInChips,sb,bb)) + ' bb'
    else:
        return "raise " + str(chipsInBlinds(float(latestNode) - 11,sb,bb)) + ' bb'

def getPositions(fn, n_players):
    position_list = ["UTG9","UTG8","UTG7","LJ","HJ","CO","BTN","SB","BB"]
    return position_list[(9-n_players):]

# def getPosition(fn,n_players):
    
#     position_list = getPositionList(fn, n_players)
#     return position_list[len(fn.split('.')) % n_players - 1]

def getPosition(fn, n_players):
    #for each action, step forward
    activePositionsList = getPositions(fn, n_players)
    j = 0
    foldedPositions = []
    actionList = fn.split('.')
    for i in range(len(actionList)):
        curPos = activePositionsList[i % n_players]

        if (curPos in foldedPositions):
            j += 1
        if (actionList[i] == '0'):
            foldedPositions.append(curPos)

    return activePositionsList[(i+j) % n_players]


def getNodeFreq(data):

    nCombosNl = 1326
    tempDataArr = data.split("\n")
    freqSum = 0
    for i in range(len(tempDataArr)):
        if (i % 2 == 0 and i <= 336):
            #jos offari
            if (len(tempDataArr[i]) > 2 and tempDataArr[i][2] == 'o'):
                freqSum += float(tempDataArr[i+1].split(";")[0])*12
            #jos pari
            if (len(tempDataArr[i]) == 2 and tempDataArr[i][0] == tempDataArr[i][1]):
                freqSum += float(tempDataArr[i+1].split(";")[0])*6
            #jos suittari
            if (len(tempDataArr[i]) > 2 and tempDataArr[i][2] == 's'):
                freqSum += float(tempDataArr[i+1].split(";")[0])*4

    return freqSum/nCombosNl

def getActionList(fn, n_players, sb, bb, antes):
    #inits
    actionNumberList = fn.split('.')
    actionList = []
    nRaises = 0

    #get all actions upto this node
    for i in range(len(actionNumberList)):
        currentPosFn = fn
        if (len(actionNumberList) > 1 ):
            currentPosFn = '.'.join(actionNumberList[:(i+1)])
        pos = getPosition(currentPosFn,n_players)
        action = numberToAction(actionNumberList[i], sb, bb, antes, nRaises, pos, actionList)
        actionList.append(pos + " " + action)

        #count nRaises for calculating 3b/4bA/x-bet size
        if ('raise' in action or 'all-in' in action):
            #print("nRaises ", nRaises, pos + " " + action)
            nRaises += 1 

    return actionList


# def remPercentagesFromActionList(actionList):
#     nRaises = 0
#     nCalls = 0

#     for i in range(len(actionList)):
#         if ('raise' in actionList[i]):
#             nRaises += 1
#         if ('call' in actionLis[i]):
#             nCalls += 1
#         if ('%' in actionList[i]):
#             #cases: nRaises
#             print(")





def monkertoJsonFile(path):

 #    print("give bbs (eg '30bb)")
 #    bbs = input()
	# path = 'C:\\Users\\Teemu\\Desktop\\mttranges\\'+ bbs


    print("loading... probably..")

    #inits, vars
    range = 'AK+ QQ'
    
    root = Node('root', id = 'root')
    nodeDict = {}
    txtDataDict = {}
    n_players = 0
    sb = 1
    bb = 2
    antes = 2

    #get file names & data
    filenames = []
    for fn in os.listdir(path):
        filenames.append(fn)
        f = open(path+'/'+fn, "r")
        txtDataDict[fn.strip(".rng")] = f.read()

        #get max pelaaja määrä: saa siitä nodesta missä kaikki kippaa (0.0.0) plus 1. sortataan array ja katotaan et eka ja vika nollia ja otetaan len+1
        sortedNodeList = sorted(fn.strip(".rng").split('.'))
        if (sortedNodeList[0] == '0' and sortedNodeList[-1] == '0' and len(sortedNodeList) + 1 > n_players):
            n_players = len(sortedNodeList) + 1



        f.close()


    
    #looppaa jokainen node, jokaisen noden uniikki id lista nykyisestä kohtaa pelipuuta, esim ["0", "1"]
    for fn in sorted(filenames, key=lambda fn: len(fn.split('.'))):

        fn = fn.strip(".rng")
        latestNode = fn.split('.')[-1]

        

        # oikee positio saadaan aina fn ja n_players avulla
        pos = getPosition(fn, n_players)
        
        #frekvenssit, esim call 60% fold 40% tms   
        freq = getNodeFreq(txtDataDict[fn]);

        #tallennetaan jokaiseen nodeen lista siihenastisista nodejen actioneista
        actionList = getActionList(fn, n_players, sb, bb, antes)

        #muutetaan actionList % betsikoot chipeiksi
        #actionLIst = remPercentagesFromActionList(actionList)

        parentNode = ""
        #jos eka pelaaja -> parent nodeksi 'root'
        if len(fn.split('.')) <= 1:
            parentNode=root
        #muuten parent nodeksi yleimpi node
        else:
            #ylemmän noden nimi on esim 0.1 tai 0 tai 0.1.40036, eli vika split '.', vika pois, ja '. takas'
            parentNode = nodeDict['.'.join(fn.split('.')[:-1])]

            

        newNode = Node(actionList[-1] + " (" + str(round(freq*100,2)) + "%)", id=fn, data=txtDataDict[fn], position=pos, parent=parentNode,freq=freq,actionList=actionList)
        nodeDict[fn] = newNode

    #export to JSON
    exporter = JsonExporter(indent=2, sort_keys=True)
    
    # save to file
    file = open(path.split("\\")[-1] + '.json', "w")
    file.write(exporter.export(root))
    file.close()

    

def jsonFileToDb(fn):

    

    with open(fn) as f:
        jsonData = json.load(f)

    collectionTrees.insert_one(jsonData)



def getChildNodesBasedOnId(id):


    # LOISTOIDEA: frontissa on puun rakenne kuitenkin jo valmiiks ilman dataa - querytaan vaan data DB:stä !
    # db datan rakenne? pelkkä lista? ei nestded? joo.

    #siis..

    # 1. monkerToJson() vaan muokkaan ilman dataa -> näistä tietueista oma db collection jotka frontti queryy heti
    # 2. datasta oma db: ei nested vaan samalla formaatilla kun 0.1.30.rng monkerviewer filutkin oli.
    



    id = '0.1.1'
    treeName = "25bb bvb (1bb ante)"




# client = pymongo.MongoClient("localhost", 27017)
# db = client.monkerDb0
# collectionTrees = db['trees']

if __name__ == '__main__':

    #todo: monkerviewer format to mongodb

    #jsonFileToDb('25bb-bvb-1bbante.json')

    #mongoTesting()

    path = "C:\\Users\\Teemu\\Desktop\\git\\monkerviewer-react-app\\backend\\monkerviewer-data\\"
    fn = "3way-ft-icm-40bb-80bb-30bb"
    monkertoJsonFile(path + fn)

    


