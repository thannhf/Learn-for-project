#include <iostream>
#include <windows.h>
#include <conio.h>
using std::count;
using std::cin;
class MathOp {
    public:
        void addition(int num1, int num2);
        void subtraction(int num1, int num2);
        void multiplication(int num1, int num2);
        void division(int num1, int num2);
};
void Menu(void);
void gotoxy(int x, int y);
int main(int argc, char** argv){
    int choice;
    int num1, num2;
    MathOp algorithm;
    do{
        Menu();
        gotoxy(22, 16);
        cout << "enter your choice:";
        cin >> choice;
        if(choice >= 1 && choice < 5) {
            system( "cls" );
			gotoxy( 18, 4);
			cout<< "===============================";
            gotoxy( 18, 5 );
            cout<< "|   Mathemactical Operation   |";
            gotoxy( 18, 6 );
            cout<< "===============================";
			gotoxy( 22, 8 );
			cout<< "Please enter two numbers.";
			gotoxy( 22, 10 );
			cout<< "Num1: ";
			cin>> num1;
			gotoxy( 22, 11 );
			cout<< "Num2: ";
			cin>> num2;
        }
        switch(choice) {
            case 1: {
                gotoxy(22, 13);
                algorithm.addition(num1, num2);
                gotoxy(22, 15);
                cout <, "press any key return menu";
                break;
            }
            case 2: {
                gotoxy(22, 13);
                algorithm.subtraction(num1, num2);
                gotoxy(22, 15);
                cout << "press any key return menu";
                break;
            }
            case 3: {
                gotoxy(22, 13);
                algorithm.multiplication(num1, num2);
                gotoxy(22, 15);
                cout << "press any key return menu";
                break;
            }
            case 4: {
                gotoxy(22, 13);
                algorithm.division(num1, num2);
                gotoxy(22, 15);
                cout << "press any key return menu";
                break;
            }
            default: {
                gotoxy(22, 18);
                cout << "press any key return menu";
            }
        }
        getch();
    } while(choice != 5);
    return 0;
}
void gotoxy(int x, int y) {
    COORD pos = {0, 0};
    pos.X = x;
    pos.Y = y;
    HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(handle, pos);
    return;
}
void textcolor(int color) {
    HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(handle, color);
    return;
}
void Menu(void) {
    system( "cls" );
	gotoxy( 18 , 4 );
	cout<< "===============================";
	gotoxy( 18, 5 );
	cout<< "|   Mathemactical Operation   |";
	gotoxy( 18, 6 );
	cout<< "===============================";
	gotoxy( 22, 8 );
	cout<< " 1.) Addition ";
	gotoxy( 22, 9 );
	cout<< " 2.) Subtraction ";
	gotoxy( 22, 10 );
	cout<< " 3.) Multiplication ";
	gotoxy( 22, 11 );
	cout<< " 4.) Division ";
	gotoxy( 22, 12 );
	cout<< " 5.) Exit ";
	gotoxy( 18, 14 );
	cout<< "*******************************";
    return;
}
void MathOp::addition(int num1, int num2) {
    cout << num1 << " + " << num2 << " = " << num1 + num2;
    return;
}
void MathOp::subtraction(int num1, int num2) {
    cout << num1 << " - " << num2 << " = " << num1 - num2;
    return;
}
void MathOp::multiplication(int num1, int num2) {
    cout << num1 << " * " << num2 << " = " << num1 * num2;
    return;
}
void MathOp::division(int num1, int num2) {
    if(num2 == 0) {
        system("cls");
        cout << "dividend cannot be zero";
        Sleep(1000);
        exit(1);
    }
    cout << num1 << " / " << num2 << " = " << num1 / num2;
    return;
}