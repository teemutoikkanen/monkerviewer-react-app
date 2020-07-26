import os

from anytree import Node, RenderTree
from anytree.exporter import JsonExporter

def threeDigitToPercentage(val):
	if (val[0] == "0"):
		return val[1:] + "%"
	return val + "%"

def numberToAction(latestNode):
	if latestNode == '0':
		return 'fold'
	if latestNode == '1':
		return 'call'
	if latestNode[:2] == '40':
		return 'raise ' + str(threeDigitToPercentage(latestNode[2:]))
	if latestNode == '3':
		return 'all-in'
	if latestNode == '9':
		return 'raise (9 bug?)'
	if latestNode == '6':
		return 'min-raise'
	if (latestNode[0] == '1' and len(latestNode) >= 2):
		raiseInChips = int(latestNode[1:]) + 1
		return 'raise to ' + str(raiseInChips) + ' chips'
	return latestNode


def getPositionList(n_players):
	position_list = ["utg9","utg8","utg7","lj","hj","co","btn","sb","bb"]
	return position_list[(9-n_players):]

def getPosition(fn,n_players):
		position_list = getPositionList(n_players)
		return position_list[len(fn.split('.')) % n_players - 1]

		#3 kätisessä esim 1.3.40367.1 -> pos on btn->sb->bb-----> BTN




def main():

	#inits, vars
	range = 'AK+ QQ'
	root = Node("root", id = 'root')
	nodeDict = {}
	dir = './20bb'
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

	    #jos eka pelaaja -> parent nodeksi 'root'
	    if len(fn.split('.')) <= 1:
	    	newNode = Node(pos + " " + numberToAction(latestNode), id=fn, data=txtDataDict[fn], position=pos, parent=root)
	    #muuten parent nodeksi yleimpi node
	    else:
	    	#ylemmän noden nimi on esim 0.1 tai 0 tai 0.1.40036, eli vika split '.', vika pois, ja '. takas'
	    	parentNode = '.'.join(fn.split('.')[:-1])
	    	newNode = Node(pos + " " + numberToAction(latestNode), id=fn, data=txtDataDict[fn], position=pos, parent=nodeDict[parentNode])
	    
	    nodeDict[fn] = newNode

	#export to JSON
	exporter = JsonExporter(indent=2, sort_keys=True)
	print(exporter.export(root))



if __name__ == '__main__':
	main()
	# print(threeDigitToPercentage("125"))