import os



dir = './20bb'

filenames = []
for fn in os.listdir(dir):
    filenames.append(fn)


'''
Just split each path by its delimiter and then add them to a tree structure one by one.
i.e. if 'x1' does not exist create this node, if it does exist go to it and check if there is a
 child 'x2' and so on..
'''

data = {
	'id': 'parent-node',
	'nodes': []
}


range = 'AK+ QQ'

def getparentIdx(data, parentNodes, currentDepth, depth)
	for i in range(len(data['nodes']))

for fn in sorted(filenames, key=lambda fn: len(fn.split('.'))):
    
    strippedFn = fn.strip(".rng").split('.')
    print(strippedFn)
    parentNodes = strippedFn[:-1]
    currentNode = strippedFn[-1]

    # jos ei vanhempia - parent nodeen
    if (len(parentNodes) == 0):
    	data['nodes'].append({'id': currentNode, 'range': range, 'children': []})
    else:
    	#etsi data['nodes'] listasta vanhin parent, toka vanhin parent, jne... 
    	depth = len(parentNodes)
    	for currentDepth in range(depth):
    		#eti parentin index: TODO KEKSI MITEN NAVIGOIN JSON DICT ARRAY HOMMAA JA PÄÄSEN KERROS KERRALLAAN LUOMAAN SEN
    		idx = getParentIdx(data['nodes'])




print(data)




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