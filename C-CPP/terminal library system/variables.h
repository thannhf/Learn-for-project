#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
#include<windows.h>

FILE *login;
char findBook;
char password[10];

struct BOOK{
    int id;
    char name[20];
    char Author[20];
    int quantity;
    float Price;
    int rackno;
    char *cat;
};
struct BOOK book;
COORD coord = {0, 0};

char catagories[][15] = {"computer", "Electronics", "Electrical", "Civil", "Mechnnical", "Architecture"};
void returnfunc(void);
void mainmenu(void);
void addbooks(void);
void deletebooks(void);
void editbooks(void);
void searchbooks(void);
void issuebooks(void);
void viewbooks(void);
void closeapplication(void);
int getdata(int);
int checkid(int);
void Password();
void get_password(char *);
void issuerecord();
void creditNclose();
void adminsignup();