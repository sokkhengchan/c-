#include <iostream>
using namespace std;
// pass by value
void changeValue(int x) {
    x = 10; // ផ្លាស់ប្តូរតម្លៃ x តែប៉ុណ្ណោះ
}
// pass by reference
void changeValue(int &x , string&r , char&w) {
    x = 10; // ផ្លាស់ប្តូរតម្លៃ x តាមអាសយដ្ឋាន
    r = "kheng";
    w = 'A';
}

int main() {
    // pass by value
    int a = 5;
    changeValue(a); // ចម្លងតម្លៃ a (5) ទៅ x
    cout << "Value of a: " << a << endl; // a នៅតែ 5
    // pass by reference
    int z = 5;
    string b = "kheang";
    char c = 'B';
    changeValue(z,b,c);// បញ្ជូនតាមយោង (Reference)
    cout << "Value of a: " << z << endl; // a ផ្លាស់ប្តូរទៅ 10
    cout << "value of b: " << b << endl;
    cout << "Value of c: " << c << endl;
    return 0;
}


