#include<iostream>
using namespace std;
int main(){
    double num1 , num2;
    char opt;
    cout<<"Enter the first number: ";cin>>num1;
    cout<<"Enter opreator (+,-,*,/): ";cin>>opt;
    cout<<"Enter the second number: ";cin>>num2;
    switch(opt){
        case '+':
        cout<<"Result of +: "<< num1 + num2<<endl;
        case '-':
        cout<<"Result of -: "<< num1 - num2<<endl;
        case '*':
        cout<<"Result of *: "<< num1 - num2<<endl;
        case '/':
        cout<<"Result of /: "<< num1 / num2<<endl;
        if (num1 == 0 && num2 == 0){
            cout<<"Eror zero it not allow in division: "<<endl;
        }
        
    }
    return 0;
}