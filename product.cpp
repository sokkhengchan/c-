#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Product {
    int id;
    string name;
    double price;
};

struct CartItem {
    Product product;
    int quantity;
};

class ShoppingCartSystem {
private:
    vector<Product> products;
    vector<CartItem> cart;
    bool loggedIn;

public:
    ShoppingCartSystem() : loggedIn(false) {
        products = {
            {1, "Apple", 0.5},
            {2, "Banana", 0.3},
            {3, "Orange", 0.7}
        };
    }

    void login() {
        if (loggedIn) {
            cout << "You are already logged in.\n";
            return;
        }
        string username, password;
        cout << "Enter username: ";
        cin >> username;
        cout << "Enter password: ";
        cin >> password;
        loggedIn = true;
        cout << "Login successful.\n";
    }

    void logout() {
        if (!loggedIn) {
            cout << "You are not logged in.\n";
            return;
        }
        loggedIn = false;
        cout << "Logout successful.\n";
    }

    void listProducts() {
        cout << "Available products:\n";
        for (const auto& product : products) {
            cout << product.id << ". " << product.name << " - $" << product.price << "\n";
        }
    }

    void addToCart() {
        if (!loggedIn) {
            cout << "Please login first.\n";
            return;
        }
        int productId, quantity;
        cout << "Enter product ID to add to cart: ";
        cin >> productId;
        cout << "Enter quantity: ";
        cin >> quantity;

        for (const auto& product : products) {
            if (product.id == productId) {
                cart.push_back({product, quantity});
                cout << quantity << " x " << product.name << " added to cart.\n";
                return;
            }
        }
        cout << "Invalid product ID.\n";
    }

    void orderProducts() {
        if (!loggedIn) {
            cout << "Please login first.\n";
            return;
        }
        if (cart.empty()) {
            cout << "Your cart is empty.\n";
            return;
        }
        double total = 0;
        cout << "Order summary:\n";
        for (const auto& item : cart) {
            double itemTotal = item.product.price * item.quantity;
            cout << item.quantity << " x " << item.product.name << " - $" << itemTotal << "\n";
            total += itemTotal;
        }
        cout << "Total price: $" << total << "\n";
        cart.clear();
        cout << "Thank you for your order!\n";
    }

    void run() {
        int choice;
        do {
            cout << "\nMenu:\n";
            cout << "1. Login\n";
            cout << "2. Logout\n";
            cout << "3. List Products\n";
            cout << "4. Add to Cart\n";
            cout << "5. Order Products\n";
            cout << "6. Exit\n";
            cout << "Enter your choice: ";
            cin >> choice;

            switch (choice) {
                case 1:
                    login();
                    break;
                case 2:
                    logout();
                    break;
                case 3:
                    listProducts();
                    break;
                case 4:
                    addToCart();
                    break;
                case 5:
                    orderProducts();
                    break;
                case 6:
                    cout << "Exiting the system. Goodbye!\n";
                    break;
                default:
                    cout << "Invalid choice. Please try again.\n";
            }
        } while (choice != 6);
    }
};

int main() {
    ShoppingCartSystem system;
    system.run();
    return 0;
}
