#include<iostream>
#include<vector>
using namespace std;
class BankAccount {
    private:
        string name;
        int accountNum;
        double balance;
    public:
        BankAccount(string n, int ac, double bal) {
            name = n;
            accountNum = ac;
            balance = bal;
        }
        string getName() {
            return name;
        }
        int getAccountNum() {
            return accountNum;
        }
        double getBalance() {
            return balance;
        }
        void deposit(double amount) {
            balance = balance + amount;
        }
        void withdraw(double amount) {
            if(balance >= amount) {
                balance = balance - amount;
                cout<<"\t\tWithdraw Successfully..."<<endl;
            } else {
                cout<<"\t\tInsufficient Balance...."<<endl;
            }
        }
};
class BankManagement {
    private:
        vector<BankAccount> accounts;
    public:
        void AddAccount(string name, int accountNum, double balance) {
            accounts.push_back(BankAccount(name, accountNum, balance));
        }
        void showAllAccounts() {
            cout << "\t\tAll account holders" << endl;
            for(int i = 0; i < accounts.size(); i++) {
                cout << "\t\tName:" << accounts[i].getName() << "account number:" << accounts[i].getAccountNum() << "balance:" << accounts[i].getBalance() << endl;
            }
        }
        void searchAccount(int account) {
            cout << "\t\tAccount Holder" << endl;
            for(int i = 0; i < accounts.size(); i++) {
                if(accounts[i].getAccountNum() == account) {
                    cout << "\t\tName:" << accounts[i].getName() << "account number:" << accounts[i].getAccountNum() << " balance:" << accounts[i].getBalance() << endl;
                }
            }
        }
        BankAccount* findAccount(int accountNum) {
            for(int i = 0; i < accounts.size(); i++) {
                if(accounts[i].getAccountNum() == accountNum) {
                    return &accounts[i];
                }
            }
        }
};
main() {
    BankManagement bank;
    int choice;
    char op;
    do {
        system("cls");
		cout<<"\t\t======== Banking Management System ========\n"<<endl;
		cout<<"\t\t\tMain Menu"<<endl;
		cout<<"\t\t1. Create New Account"<<endl;
		cout<<"\t\t2. Show All Account"<<endl;
		cout<<"\t\t3. Search Account"<<endl;
		cout<<"\t\t4. Deposit Money"<<endl;
		cout<<"\t\t5. Withdraw Money"<<endl;
		cout<<"\t\t6. Exit"<<endl;
		cout<<"\t\t-------------------------------"<<endl;
		cout<<"\t\tEnter Your Choice :";
        cin >> choice;
        switch(choice) {
            case 1: {
                string name;
                int accountNum;
                cout << "\t\tenter name:";
                cin >> name;
                cout << "\t\tenter account number:";
                cin >> accountNum;
                cout << "\t\tenter initial balance:";
                cin >> balance;
                bank.AddAccount(name, accountNum, balance);
                cout << "\t\tAccount Created successfully..." << endl;
                break;
            }
            case 2: {
                bank.showAllAccounts();
                break;
            }
            case 3: {
                int accountNum;
                cout << "\t\tEnter Account number:";
                cin >> accountNum;
                bank.searchAccount(accountNum);
                break;
            }
            case 4: {
                int accountNum;
                double amount;
                cout << "\t\tEnter Account number to deposit money:";
                cin >> accountNum;
                BankAccount* account = bank.findAccount(accountNum);
                if(account != NULL) {
                    cout << "\t\tenter amount to deposit:";
                    cin >> amount;
                    account->deposit(amount);
                    cout << "\t\t" << amount << "deposit successfully..."<< endl;
                } else {
                    cout << "\t\taccount not found..."<<endl;
                }
                break;
            }
            case 5: {
                int accountNum;
                double amount;
                cout<<"\t\tEnter Account Number to Withdraw Money :";
                cin >> accountNum;
                BankAccount* account = bank.findAccount(accountNum);
                if(account != NULL) {
                    cout<<"\t\tEnter Amount to withdraw :";
                    cin >> amount;
                    account->withdraw(amount);
                } else {
                    cout<<"\t\tAcount Not Found ..."<<endl;
                }
                break;
            }
            case 6: {
                exit(1);
                break;
            }
        }
        cout<<"\t\tDo You Want to Countinue or Exit [Y/N]: ";
        cin >> op;
    } while(op == 'y' || op == 'Y');
}