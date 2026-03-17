a = int(input())
b = int(input())

for i in range(a, b + 1):
    if i >= 0:
        koren = int(i**0.5)
        if koren * koren == i:
            print(i)