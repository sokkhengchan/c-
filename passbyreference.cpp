#include <iostream>
using namespace std;

void changeValue(int &x , string&r , char&w) {
    x = 10; // ផ្លាស់ប្តូរតម្លៃ x តាមអាសយដ្ឋាន
    r = "kheng";
    w = 'A';
}

int main() {
    int a = 5;
    string b = "kheang";
    char c = 'B';
    changeValue(a,b,c);// បញ្ជូនតាមយោង (Reference)
    cout << "Value of a: " << a << endl; // a ផ្លាស់ប្តូរទៅ 10
    cout << "value of b: " << b << endl;
    cout << "Value of c: " << c << endl;
    return 0;
}