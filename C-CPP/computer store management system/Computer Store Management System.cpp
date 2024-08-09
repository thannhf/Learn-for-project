#include "Class.cpp"
#include "Structure.cpp"
#include "TakeOrder.cpp"
#include "DeleteOrder.cpp"
#include "DisplayReceipt.cpp"
#include "ModifyOrder.cpp"
#include "DailySummary.cpp"
#include "Exit.cpp"
int main() {
    computerType computer;
    int menu;
    do {
        system("cls");
        cout << "\t\t==================================================\n";
        cout << "\t\t\t Computer Store Management System \n";
        cout << "\t\t==================================================\n\n";
        cout << "\t\t---------------------------------------------------\n";
        cout << "\t\t||\t1. Make an Order \t\t         ||\n";
        cout << "\t\t||\t2. Delete Order\t\t\t         ||\n";
        cout << "\t\t||\t3. Modify Order Record \t\t\t ||\n";
        cout << "\t\t||\t4. Print Receipt                  \t ||\n";
        cout << "\t\t||\t5. Daily Summary of Total Sale \t\t ||\n";
        cout << "\t\t||\t6. Exit\t\t\t\t\t ||\n";
        cout << "\t\t---------------------------------------------------\n";
        cout << "\nEnter Choice: ";
        cin >> menu;
        switch(menu) {
            case 1: {
                computer.take_order();
                break;
            }
            case 2: {
                computer.delete_order();
                system("PAUSE");
                break;
            }
            case 3: {
                computer.modify();
                system("PAUSE");
                break;
            }
            case 4: {
                computer.order_list();
                system("PAUSE");
                break;
            }
            case 5: {
                computer.daily_summary();
                system("PAUSE");
                break;
            }
            case 6: {
                computer.exit();
                goto a;
                break;
            }
            default: {
                cout << "Invalid input\nPlease re-enter the input\n" << endl;
            }
        }
    } while(menu != 6);
    a:
        cout << "\t\t===========================\n";
        cout << "\t\t\tThank You!!!\n";
        cout << "\t\t===========================\n\n";
        system("PAUSE");
        
    return 0;
}