'''
import random as rd
table = [1,2,3,4,5]
n = len(table) - 1
dull = 0
for i in range(len(table)):
    rd_num = rd.randint(0,n)
    dull = table[i]
    table[i] = table[rd_num]
    table[rd_num] = dull
print(table)

chain = "ichbinschnappi"
under_chain = "bin"

if ( under_chain in chain):
    print("hahaha")
    print(chain.index(under_chain))
else:
    print("55555555")

len_u = len(under_chain)
for i in range(len(chain) - len_u + 1):
    if (under_chain == chain[i:i+len_u]):
        print("found")
    

chain = "1 2 3"
array=chain.split(" ")
chain = ""
chain = ''.join(array)
print(chain)

with open("rw.txt","w") as op:
    op.write("\nBack to 2018\n")
    for i in range(10):
        for j in range(10):
            if((i % 2 == 0 and j % 2 == 0) or (i % 2 != 0 and j % 2 != 0)):
                op.write("X")
            else:
                op.write("O")
        op.write("\n")




    liste = op.readlines()
    text = ""
    for l in liste:
        text += l.rstrip()
        text += "\n"
    print(text)

op.close()
'''

lv_nv=[]
visited = [1,2,3]
lv = [1,2,3,4,5]

lv_nv = [v for v in lv if v not in visited]

'''
for v in lv:
    if v not in visited:
        lv_nv.append(v)
'''
print("结果： ",lv_nv)