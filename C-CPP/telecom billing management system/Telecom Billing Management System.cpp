#include<stdio.h>
#include<conio.h>
#include<windows.h>
#include<stdlib.h>
struct subscriber{
    char phonenumber[20];
    char name[50];
    float amount;
}s;
void gotoxy(int, int);
void addrecords();
void listrecords();
void modifyrecords();
void deleterecords();
void searchrecords();
void payment();
void login();
char get;
int main() {
    int password;
    int phonenumber;
    char choice;
    system("cls");
    gotoxy(10, 2);
    system("cls");
    gotoxy(0, 2);
    printf("\t********************************************************");
	printf("\n\t     ------ TELECOM BILLING MANAGEMENT SYSTEM ------");
	printf("\n\t********************************************************");
	printf("\n\n\n\t\t Press Any Key To Continue. . ");
    Sleep(0);
    getch();
    system("cls");
    login();
    system("cls");
    gotoxy(30, 0);
    while(1) {
        printf("\n\n\xDB\xDB\xDB\xDB\xDB  TELECOM BILLING SYSTEM  \xDB\xDB\xDB\xDB\xDB");
	    printf(" \n\n \xDB\xDB 1 : Add New Record.\n\n \xDB\xDB 2 : List Of Record");
	    printf("\n\n \xDB\xDB 3 : Modify Record.\n\n \xDB\xDB 4 : Payment Transaction");
		printf("\n\n \xDB\xDB 5 : Search Record.");
		printf("\n\n \xDB\xDB 6 : Delete Record.\n\n \xDB\xDB 7 : Exit\n");
	    printf("\n Enter Your Choice:-");
        choice = getche();
        choice = toupper(choice);
        switch(choice) {
            case '1':
                addrecords();
                break;
            case '2':
                listrecords();
                break;
            case '3':
                modifyrecords();
                break;
            case '4':
                payment();
                break;
            case '5':
                searchrecords();
                break;
            case '6':
                deleterecords();
                break;
            case '7':
                system("cls");
                gotoxy(1,25);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(1,26);
				printf("   \xDB");
				gotoxy(1,27);
				printf("   \xDB");
				gotoxy(1,28);
				printf("   \xDB");
				gotoxy(1,29);
				printf("   \xDB");
				gotoxy(1,30);
				printf("   \xDB");
				gotoxy(1,31);
				printf("   \xDB");
				gotoxy(10,25);
				printf("\xDB     \xDB");
				gotoxy(10,26);
				printf("\xDB     \xDB");
				gotoxy(10,27);
				printf("\xDB     \xDB");
				gotoxy(10,28);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(10,29);
				printf("\xDB     \xDB");
				gotoxy(10,30);
				printf("\xDB     \xDB");
				gotoxy(10,31);
				printf("\xDB     \xDB");
				gotoxy(19,25);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(19,26);
				printf("\xDB     \xDB");
				gotoxy(19,27);
				printf("\xDB     \xDB");
				gotoxy(19,28);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(19,29);
				printf("\xDB     \xDB");
				gotoxy(19,30);
				printf("\xDB     \xDB");
				gotoxy(19,31);
				printf("\xDB     \xDB");
				gotoxy(28,25);
				printf("      \xDB");
				gotoxy(28,26);
				printf("\xDB\xDB    \xDB");
				gotoxy(28,27);
				printf("\xDB \xDB   \xDB");
				gotoxy(28,28);
				printf("\xDB  \xDB  \xDB");
				gotoxy(28,29);
				printf("\xDB   \xDB \xDB");
				gotoxy(28,30);
				printf("\xDB    \xDB\xDB");
				gotoxy(28,31);
				printf("\xDB");
			    gotoxy(37,25);
				printf("\xDB     \xDB");
				gotoxy(37,26);
				printf("\xDB    \xDB");
				gotoxy(37,27);
				printf("\xDB   \xDB");
				gotoxy(37,28);
				printf("\xDB\xDB\xDB\xDB");
				gotoxy(37,29);
				printf("\xDB   \xDB");
				gotoxy(37,30);
				printf("\xDB    \xDB");
				gotoxy(37,31);
				printf("\xDB     \xDB");
				gotoxy(46,25);
				printf("\xDB     \xDB");
				gotoxy(46,26);
				printf(" \xDB   \xDB");
				gotoxy(46,27);
				printf("  \xDB \xDB");
				gotoxy(46,28);
				printf("   \xDB");
				gotoxy(46,29);
				printf("   \xDB");
				gotoxy(46,30);
				printf("   \xDB");
				gotoxy(46,31);
				printf("   \xDB");
				gotoxy(55,25);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(55,26);
				printf("\xDB     \xDB");
				gotoxy(55,27);
				printf("\xDB     \xDB");
				gotoxy(55,28);
				printf("\xDB     \xDB");
				gotoxy(55,29);
				printf("\xDB     \xDB");
				gotoxy(55,30);
				printf("\xDB     \xDB");
				gotoxy(55,31);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
				gotoxy(64,25);
				printf("\xDB     \xDB");
				gotoxy(64,26);
				printf("\xDB     \xDB");
				gotoxy(64,27);
				printf("\xDB     \xDB");
				gotoxy(64,28);
				printf("\xDB     \xDB");
				gotoxy(64,29);
				printf("\xDB     \xDB");
				gotoxy(64,30);
				printf("\xDB     \xDB");
				gotoxy(64,31);
				printf("\xDB\xDB\xDB\xDB\xDB\xDB\xDB");
                Sleep(2000);
                exit(0);
                break;
            default:
                system("cls");
                gotoxy(30,20);
				printf("Incorrect Input");
				printf("\a......");
				gotoxy(30,24);
				printf("Any key to continue");
                getch();
        }
    }
}
COORD coord = {0, 0};
COORD max_res, cursor_size;
void gotoxy(int x, int y) {
    coord.X = x;
    coord.y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}
void addrecords() {
    FILE *f;
    char test;
    f = fopen("pro.txt", "ab+");
    if(f == 0) {
        f = fopen("pro.txt", "wb+");
        system("cls");
        printf("Please wait while we configure your computer");
		printf("\npress any key to continue");
        getch();
    }
    while(1) {
        system("cls");
        printf("\n Enter phone number:");
        scanf("%s", &s.phonenumber);
        printf("\n enter name: ");
        fflush(stdin);
        scanf("%s", &s.name);
        printf("\n enter amount: ");
        scanf("\n enter amount: ");
        scanf("%f", &s.amount);
        fwrite(&s, sizeof(s), 1, f);
        fflush(stdin);
        printf("\n\n record is successfully added");
        printf("\n press esc key to exit or press any other ky to add other record: ");
        test = getche();
        if(test == 27) break;
    }
    fclose(f);
    system("cls");
}
void listrecords() {
    FILE *f;
    int i;
    if((f = fopen("pro.txt", "rb")) == NULL) {
        exit(0);
    }
    system("cls");
    printf("phone number\t\tuser name\tamount\n");
    for(i = 0; i < 79; i++) {
        printf("-");
    }
    while(fread(&s, sizeof(s), 1, f) == 1) {
        printf("\n%s\t\t%s\t\t$. %.2f /-", s.phonenumber, s.name, s.amount);
    }
    printf("\n");
    for(i = 0; i < 79; i++) {
        printf("-");
    }
    fclose(f);
    printf("\n\npress any key to go back");
    getch();
    system("cls");
}
void deleterecords() {
    FILE *f, *t;
    char phonenumber[20];
    system("cls");
    f = fopen("pro.txt", "rb+");
    t = fopen("pro1.txt", "wb+");
    do {
        rewind(f);
        printf("enter the phone number to be deleted from the database: ");
        scanf("%s", phonenumber);
        while(fread(&s, sizeof(s), 1, f) == 1) {
            if(strcmp(s.phonenumber, phonenumber) != 0) {
                fwrite(&s, sizeof(s), 1, t);
            } else {
                printf("record deleted successfully");
            }
        }
        fclose(f);
        fclose(t);
        remove("pro.txt");
        rename("pro1.txt", "pro.txt");
        f= fopen("pro.txt", "rb+");
        t = fopen("pro1.txt", "wb+");
        printf("\ndo you want to delete another record(Y/N):");
        fflush(stdin);
    }
    while(getche() == 'y' || getche() == 'Y');
    fclose(f);
    getch();
    system("cls");
}
void searchrecords() {
    FILE *f;
    char phonenumber[20];
    int flag = 1;
    f = fopen("pro.txt", "rb+");
    fflush(stdin);
    system("cls");
    printf("enter phone number to search in our database: ");
    scanf("%s", phonenumber);
    while(fread(&s, sizeof(s), 1, f) == 1) {
        if(strcmp(s.phonenumber, phonenumber) == 0) {
            system("cls");
            printf("record found");
            printf("\n\nphonenumber: %s\nname: %s\namount: $.%0.2f\n", s.phonenumber, s.name, s.amount);
            flag = 0;
            break;
        } else if(flag == 1) {
            system("cls");
            printf("requested phone number not found in our database");
        }
    }
    getch();
    fclose(f);
    system("cls");
}
void modifyrecords() {
    FILE *f;
    char phonenumber[20];
    long int size = sizeof(s);
    if((f = fopen("pro.txt", "rb+")) == NULL) exit(0);
    system("cls");
    printf("enter phone number of the subscriber to modify: ");
    scanf("%s", phonenumber);
    fflush(stdin);
    while(fread(&s, sizeof(s), 1, f) == 1) {
        if(strcmp(s.phonenumber, phonenumber) == 0) {
            system("cls");
            printf("\nenter phone number: ");
            scanf("%s", &s.phonenumber);
            printf("\nenter name: ");
            fflush(stdin);
            scanf("%[^\n]", &s.name);
            printf("\n enter amount: ");
            scanf("%f", &s.amount);
            fseek(f, -size, SEEK_CUR);
            fwrite(&s, sizeof(s), 1, f);
            break;
        }
    }
    fclose(f);
    system("cls");
}
void payment() {
    FILE *f;
    char phonenumber[20];
    long int size = sizeof(s);
    float amt;
    int i;
    if((f = fopen("pro.txt", "rb+")) == NULL) {
        exit(0);
    }
    system("cls");
    printf("enter phone number of the subscriber of payment: ");
    scanf("%s", phonenumber);
    fflush(stdin);
    while(fread(&s, sizeof(s), 1, f) == 1) {
        if(strcmp(s.phonenumber, phonenumber) == 0) {
            printf("\n ***DETAILS***");
			printf("\n Phone No.: %s",s.phonenumber);
			printf("\n Name: %s",s.name);
			printf("\n Current amount: %f",s.amount);
			printf("\n");
            for(i = 0; i < 79; i++) printf("-");
            printf("\n\nenter amount of payment: ");
            fflush(stdin);
            scanf(" %f", &amt);
            s.amount = s.amount - amt;
            fseek(f, -size, SEEK_CUR);
            fwrite(&s, sizeof(s), 1, f);
            break;
        }
    }
    printf("\n\n");
	printf("System Message: THANK YOU %s FOR YOUR TIMELY PAYMENTS!!",s.name);
	getch();
	fclose(f);
	system("cls");
}
void login() {
    int a = 0, i = 0;
    char uname[10], c = ' ';
    char pword[10], code[10];
    char user[10] = "user";
    char pass[10] = "pass";
    do {
        printf("\n  ************************** USER LOGIN  **************************  ");
        printf(" \n                       ENTER USERNAME:-");
        scanf("%s", &uname);
        printf(" \n                       ENTER PASSWORD:-");
        while(i < 10) {
            pword[i] = getch();
            c = pword[i];
            if(c == 13) break;
            else printf("*");
            i++;
        }
        pword[i] = '\0';
        i = 0;
        if(strcmp(uname, "admin") == 0 && strcmp(pword, "admin") == 0) {
            printf("  \n\n\n       WELCOME TO OUR SYSTEM !!!! LOGIN IS SUCCESSFUL");
	        printf("\n\n\n\t\t\t\tPress any key to continue...");
            getch();
            break;
        } else {
            printf("\n        SORRY !!!!  LOGIN IS UNSUCESSFUL");
            a++;
            getch();
            system("cls");
        }
    }
    while(a <= 2);
    if(a > 2) {
        printf("\nSorry you have entered the wrong username and password for four times!!!");
        getch();
    }
    system("cls");
}