class Test:
    #Check whether a number is odd or even
    def odd(number):
        return "{} is even".format(number) if number % 2 == 0 else "{} is odd".format(number)

    #Check the voting age
    def vote(age):
        return "You are eligible to vote" if age>=18 else "Sorry,not eligible to vote"

    #Check whether a number is between  20 and 50 and must be divisible by 5
    def divisibility(number):
        return "{} is between 20 and 50 and divisible by 5".format(number)\
            if number % 5 == 0 and 20 <= number <= 50\
            else "{} is not between 20 and 50 and divisible by 5".format(number)

#Taking user inputs
oddnumber = int(input("Enter a number to check odd or even"))
print(Test.odd(oddnumber))

age = int(input("Enter your age to check whether you are eligible for voting"))
print(Test.vote(age))

divisibilty = int(input("Enter a number between 20 and 50 to check divisibility by 5"))
print(Test.divisibility(divisibilty))