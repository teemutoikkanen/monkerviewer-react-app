# Raise % x (all previous bets + previous bet) + previous bet
# Open raise 50%
# 0.50(1+2+2) + 2 = 4.5

sb = 0.5
bb = 1
a = 1
rs= 0.37

print(rs*(sb+bb+a+bb)+bb)