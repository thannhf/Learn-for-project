void computerType::modify() {
    system("cls");
    int i, ch, sid;
    bool found = false;
    temp = start_ptr;
    if(temp == NULL || sid == 0) {
        cout << "\n\t\t=============================\n";
        cout << "\t\t    NO RECORD TO MODIFY...!\n";
        cout << "\t\t=============================\n\n";
    } else {
        cout << "\nEnter Receipt Number To Modify: ";
        cin >> sid;
        while(temp != NULL && !found) {
            if(temp->receipt_number == sid) {
                found = true;
            } else {
                temp = temp->next;
            }
            if(found) {
                cout << "change order number:";
                cin >> temp->receipt_number;
                cout << "change customer name:";
                cin >> temp->customerName;
                cout << "change date:";
                cin >> temp->date;
                cout << "\nHow many new laptops would you like to change" << endl;
                cout << "(Maximum is 10 order for each transaction): ";
                cin >> temp->x;
                if(temp->x > 10) {
                    cout << "The laptop you order is exceed the maximum amount of order!";
                    system("pause");
                } else {
                    for(i = 0; i < temp->x; i++) {
                        cout << "-----------------------------------------\n";
                        cout << "\nPlease Enter your selection to Change: ";
                        cin >> temp->menu2[i];
                        cout << "change laptop name: " << temp->computerName[temp->menu2[i] - 1] << endl;
                        cout << "\nhow many new laptops do you wants: ";
                        cin >> temp->quantity[i];
                        cout << "\n-----------------------------------------\n";
                        temp->amount[i] = temp->quantity[i] * temp->computer[temp->menu2[i] - 1];
                        cout << "\n----------------------------------------------------------------\n";
                        cout << "The amount you need to pay after modification is: " << "Rs. " << temp->amount[i] << ".00/-\n";
                        cout << "----------------------------------------------------------------\n\n"; 
                        system("PAUSE");
                    }
                    temp = temp->next;
                    system("cls");
                }
                cout << "\n\t\t=============================\n";
                cout << "\t\t     RECORD MODIFIED....!" << endl;
                cout << "\t\t=============================\n\n";
            } else {
                if(temp != NULL && temp->receipt_number != sid) {
                    cout << "\n\t\t===============================\n";
                    cout << "\t\t   Invalid Receipt Number...!" << endl;
                    cout << "\t\t===============================\n\n";
                }
            }
        }
    }
}