import os

from anytree import Node, RenderTree
from anytree.exporter import JsonExporter

def threeDigitToPercentage(val):
	if (val[0] == "0"):
		return val[1:] + "%"
	return val + "%"


# 	If it starts with 40, the next 3 numbers are the raise size in %, otherwise:

# 0 = Fold
# 1 =  Call
# 2 = Pot
# 3 = All In
# 4 = Half Pot
# 9 = 75% Pot
# or
# Number - 11 = Raise Size
def numberToAction(latestNode):
	if latestNode == '0':
		return 'fold'
	elif latestNode == '1':
		return 'call'
	elif latestNode == '2':
		return 'raise 100% pot'
	elif (latestNode[:2] == '40' and len(latestNode) == 5):
		return 'raise ' + str(threeDigitToPercentage(latestNode[2:]))
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
		return 'raise ' + str(raiseInChips)
	else:
		return "raise " + str(float(latestNode) - 11)

def getPositionList(n_players):
	position_list = ["UTG9","UTG8","UTG7","LJ","HJ","CO","BTN","SB","BB"]
	return position_list[(9-n_players):]

def getPosition(fn,n_players):
		position_list = getPositionList(n_players)
		return position_list[len(fn.split('.')) % n_players - 1]

		#3 kätisessä esim 1.3.40367.1 -> pos on btn->sb->bb-----> BTN

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







def main():

	#inits, vars
	range = 'AK+ QQ'
	dir = './20bb'
	root = Node(dir, id = 'root')
	nodeDict = {}
	txtDataDict = {}
	n_players = 0

	#get file names & data
	filenames = []
	for fn in os.listdir(dir):
	    filenames.append(fn)
	    f = open(dir+'/'+fn, "r")
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

	    pos = getPosition(fn, n_players)

	    freq = getNodeFreq(txtDataDict[fn]);
	    # print(pos,latestNode,freq)

	    parentNode = ""
	    #jos eka pelaaja -> parent nodeksi 'root'
	    if len(fn.split('.')) <= 1:
	    	parentNode=root
	    #muuten parent nodeksi yleimpi node
	    else:
	    	#ylemmän noden nimi on esim 0.1 tai 0 tai 0.1.40036, eli vika split '.', vika pois, ja '. takas'
	    	parentNode = '.'.join(fn.split('.')[:-1])

        newNode = Node(pos + " " + numberToAction(latestNode) + " (" + str(round(freq*100,2)) + "%)", id=fn, data=txtDataDict[fn], position=pos, parent=nodeDict[parentNode],freq=freq)
	    nodeDict[fn] = newNode

	#export to JSON
	exporter = JsonExporter(indent=2, sort_keys=True)
	# print(exporter.export(root))



if __name__ == '__main__':
	main()
	# print(threeDigitToPercentage("125"))