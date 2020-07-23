import os

from anytree import Node, RenderTree
from anytree.exporter import JsonExporter

def numberToAction(latestNode):
	if latestNode == '0':
		return 'fold'
	if latestNode == '1':
		return 'limp'
	if latestNode[:2] == '40':
		return 'raise ' + str(latestNode[2:])

	return latestNode

#inits, vars
range = 'AK+ QQ'
root = Node("root", id = 'root')
nodeDict = {}
dir = './20bb'
txtDataDict = {}

#get file names & data
filenames = []
for fn in os.listdir(dir):
    filenames.append(fn)

    f = open(dir+'/'+fn, "r")

    txtDataDict[fn.strip(".rng")] = f.read()
    f.close()


#looppaa jokainen node, jokaisen noden uniikki id lista nykyisestä kohtaa pelipuuta, esim ["0", "1"]
for fn in sorted(filenames, key=lambda fn: len(fn.split('.'))):
    
    fn = fn.strip(".rng")
    latestNode = fn.split('.')[-1]
    # strippedFn = fn.strip(".rng").split('.')    
    # parentNodes = strippedFn[:-1]
    # currentNode = strippedFn[-1]

    #jos eka pelaaja -> parent nodeksi 'root'
    if len(fn.split('.')) <= 1:
    	newNode = Node(numberToAction(latestNode), id=fn, data=txtDataDict[fn], parent=root)
    #muuten parent nodeksi yleimpi node
    else:
    	#ylemmän noden nimi on esim 0.1 tai 0 tai 0.1.40036, eli vika split '.', vika pois, ja '. takas'
    	parentNode = '.'.join(fn.split('.')[:-1])
    	newNode = Node(numberToAction(latestNode), id=fn, data=txtDataDict[fn], parent=nodeDict[parentNode])
    
    nodeDict[fn] = newNode

#export to JSON
exporter = JsonExporter(indent=2, sort_keys=True)
print(exporter.export(root))












    # print(strippedFn)
    

    # # jos ei vanhempia - parent nodeen
    # if (len(parentNodes) == 0):
    # 	data['nodes'].append({'id': currentNode, 'range': range, 'children': []})
    # else:
		#eti parentin index: TODO KEKSI MITEN NAVIGOIN JSON DICT ARRAY HOMMAA JA PÄÄSEN KERROS KERRALLAAN LUOMAAN SEN
		# https://pypi.org/project/anytree/
		# https://stackoverflow.com/questions/9618862/how-to-parse-a-directory-structure-into-dictionary






#print(data)




#ESIMERKKI data = {
#   id: 'root',
#   children: [
#     {
#       id: '1',
#       name: 'player 1 fold',
#     },
#     {
#       id: '3',
#       name: 'player 1 raise 2bb',
#       children: [
#         {
#           id: '4',
#           name: 'player 2 raise 6bb',
#         },
#       ],
#     },
#   ],
# };
# 