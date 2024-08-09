void computerType::order_list() {
    int i, num;
    bool found = false;
    string str = "\t\t===========================================\n";
    system("cls");
    node *temp = start_ptr;
    if(temp == NULL) {
        cout << endl << str;
        cout << "\t\t\tThere is no Order to show!!!\n\t\t\tThe List is Empty\n";
        cout << str << endl;
    } else {
        cout << "\nEnter the Receipt Number To Print The Receipt: ";
        cin >> num;
        cout << "\n";
        while(temp != NULL && !found) {
            if(temp->receipt_number == num) {
                found = true;
            } else {
                temp = temp->next;
            }
            if(found) {
                cout << "===============================================================================" << endl;
                cout << "\t\t\t\t  Here is the Ordered list\n";
                cout << "===============================================================================\n" << endl;
                cout << "Receipt Number : " << temp->receipt_number << endl;
                cout << "Customer Name  : " << temp->customerName << endl;
                cout << "Order Date     : " << temp->date << endl << endl;
                cout << "+==================+======================+==============+===================" << endl;
                cout << "|  Computer Type   |     Computer Name    |   Quantity   |  Total Price ($) |" << endl;
                cout << "+==================+======================+==============+===================" << endl;
                for(i = 0; i < temp->x; i++) {
                    cout << "   " << temp->type[temp->menu2[i] - 1] << "   ";
                    cout << "\t\t" << temp->computerName[temp->menu2[i] - 1] << "    ";
                    cout << "\t" << temp->quantity[i] << "\t";
                    cout << "   " << temp->amount[i] << ".00" << endl;
                    cout << "+------------------+------------------------------+--------------------+-----" << endl;
                }
                temp->total = temp->amount[0] + temp->amount[1] + temp->amount[2] + temp->amount[3] + temp->amount[4] + temp->amount[5] + temp->amount[6] + temp->amount[7] + temp->amount[8] + temp->amount[9];
                cout << "\nTotal Bill: " << temp->total << ".00/- $.";
                cout << "\n\n";
                cout << "Thank You!!!\n";
                cout << "------------\n";
                cout << "================================================================================\n\n";
            }
        }
        if(!found) {
            cout << str;
            cout << "\t\t\t  Invalid Receipt Number!\n";
            cout << str << endl;
        }
    }
}