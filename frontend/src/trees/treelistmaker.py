
import os


constprint = "\n\nconst treeDict = { \n"

d = "."
for fn in os.listdir(d):
	full_path = os.path.join(d, fn)
	#if os.path.isfile(full_path):
	if ('.json' in fn):
		objName = 'jsondata' + ''.join(fn.strip(".json").split("-"))
		print("import " + objName + " from " + '"' + '../../trees/' + fn +'"')
		constprint += objName + ": " + objName +  ", \n"


print(constprint[:-3] + "\n}")


