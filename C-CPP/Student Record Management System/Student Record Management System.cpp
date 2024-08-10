#include<stdio.h>
#include<iostream>
#include<fstream>
#include<string.h>
#include<time.h>
#include<string>
using namespace std;
int main(){
    printf("\n");
    cout<<("\t\t\t----------------------------------------\n");
    cout<<("\t\t\t|    STUDENT RECORD MANAGEMENT SYSTEM  |\n");
    cout<<("\t\t\t----------------------------------------\n");
    cout<<("\n\n\n");
    cout<<("\t\t\t");
    cout<<("REGISTRATION NUMBER:    ");
    cout<<(":");
    cout<<("  21804634");
    cout<<("\n\n\n\n");
    cout<<("\t\t\tPress Enter to continue......");
    getchar();
	char data[15];
	int n = 0, option = 0, count_n = 0;
	string empty = "00";
	string proctor = "";
	ifstream f("student_record.txt");
	string line;
	for (int i = 0; std::getline(f, line); ++i){
		count_n++;
    }
	while(option != 5){
        cout << "\n\t\t\t[Select an option:] \n\n\t\t\t1. Add New Students\n\t\t\t2. "
            << "Student View Marks\n\t\t\t3. Update Student Marks\n\t\t\t4. View All Student Marks\n\t\t\t"
            << "5. Exit\n\t\t\tEnter option: ";
        cin >> option;
        if(option == 1){
            cout << "\n\t\t\tEnter the number of students: ";
            cin >> n;
            count_n = count_n + n;
            for (int i = 0;i < n;i++){
                ofstream outfile;
                outfile.open("student_record.txt",ios::app);
                cout << "\n\t\t\tEnter your registration number: ";
                cin >> data;
                outfile << data << "\t";

                cout << "\n\t\t\tEnter name: ";
                cin >> data;
                int len = strlen(data);

                while (len < 15){
                    data[len] = ' ';
                    len = len + 1;
                }
                outfile << data << "\t";
                outfile << empty << "\t";
                outfile << empty << "\t";

            }
        }else if (option == 2){
            char regno[9];
            cout << "\n\t\t\tEnter your registration number: ";
            cin >> regno;
            ifstream infile;
            int check = 0;
            infile.open("student_record.txt",ios::in);

            while (infile >> data){
                if (strcmp(data,regno) == 0){
                    cout << "\n\t\t\tRegistration Number: " << data << endl;
                    infile >> data;
                    cout << "\n\t\t\tName: " << data << endl;

                    infile >> data;
                        cout << "\n\t\t\tCSE101 mark: " << data << endl;

                    infile>>data;
                    cout<<"\n\t\t\tCSE102 mark: "<<data<<endl;

                    infile.close();
                    check = 1;
                }
            }

            if (check == 0){
                cout<<"\n\t\t\tNo such registration number found!"<<endl;
            }

        }else if (option == 3){
            char subcode[7];
            cout << "\n\t\t\tEnter your subject code: ";
            cin >> subcode;
            string code1 = "CSE101", code2 = "CSE102",mark = "";
            ifstream infile;
            int check = 0;

            cout << "\n\t\t\tAvailable operations: \n\t\t\t1. Add data about marks\n"
                    << "\t\t\t2. View data\n\t\t\tEnter option: ";
            cin >> option;

            if (option == 1){
                cout << "\n\t\t\tWarning! You would need to add mark"
                        << "\n\t\t\tdetails for all the students!" << endl;
                for(int i = 0;i < count_n;i++){
                    fstream file("student_record.txt");
                    if(strcmp(subcode,code1.c_str()) == 0){
                        file.seekp(26+37*i,std::ios_base::beg);
                        cout << "\n\t\t\tEnter the mark of student#" << (i+1) << " : ";
                        cin >> mark;
                        file.write(mark.c_str(),2);
                    }
                    if(strcmp(subcode,code2.c_str()) == 0){
                        file.seekp(29+37*i,std::ios_base::beg);
                        cout << "\n\t\t\tEnter the mark of student#" << (i+1) << " : ";
                        cin >> mark;
                        file.write(mark.c_str(),2);
                    }
                }
            }else if(option == 2){
                infile.open("student_record.txt",ios::in);
                if (strcmp(subcode,code1.c_str()) == 0){
                    cout << "\n\t\t\tRegistration number - Marks\n" << endl;
                    while(infile >> data){
                        cout << "\t\t\t" << data;
                        infile >> data;
                            infile >> data;
                        cout << " - " << data << endl;
                        infile >> data;
                        infile >> data;
                        check = 1;
                    }
                }

                infile.close();
                infile.open("student_record.txt",ios::in);

                if(strcmp(subcode,code2.c_str()) == 0){
                    cout << "\n\t\t\tRegistration number - Marks\n" << endl;
                    while(infile >> data){
                        cout << data;
                        infile >> data;
                        infile >> data;
                        infile >> data;
                        cout << " - " << data << endl;
                        infile >> data;
                        check = 1;
                    }
                }
            }
            infile.close();
        }else if(option == 4){
            char password[25];
            cout << "\n\t\t\tEnter the admin password: ";
            cin >> password;
            string admin_pass = "admin";
            if (strcmp(password,admin_pass.c_str()) == 0){
                cout << "\n\t\t\tReg No.	 \tName \t\tCSE101 \tCSE102" << endl;
                ifstream infile;
                infile.open("student_record.txt",ios::in);
                char data[20];
                while(infile >> data){
                    cout << "\t\t\t" << data << "\t";
                    infile >> data;
                    cout << data << "\t";
                    infile >> data;
                    cout << data << "\t";
                    infile >> data;
                    cout << data << "\t\n\n";
                }
            }
        }
    }
}