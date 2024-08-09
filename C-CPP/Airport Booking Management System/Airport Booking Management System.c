#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
#include<string.h>
#include<Windows.h>

struct mufti_airline{
    char passport[6];
    char name[15];
    char destination[15];
    int seat_num;
    char email[15];
    struct mufti_airline *following;
}
*begin, *stream;
struct mufti_airline *dummy;
void main() {
    void reserve(int x), cancel(), display(), savefile();
    int choice;
    begin = stream = NULL;
    int num = 1;
    do {
        printf("\n\n\t\t ==============================================");
		printf("\n\t\t        Airport Booking Management System      ");
		printf("\n\t\t ==============================================");
		printf("\n\n\n\t\t Please enter your choice from below (1-4):");
		printf("\n\n\t\t 1. Make Reservation");
		printf("\n\n\t\t 2. Cancel");
		printf("\n\n\t\t 3. Show Record");
		printf("\n\n\t\t 4. Exit");
		printf("\n\n\t\t Enter your choice :");
        scanf("%d", &choice);
        fflush(stdin);
        system("cls");
        switch(choice) {
            case 1:
                reserve(num);
                num++;
                break;
            case 2:
                cancel();
                break;
            case 3:
                display();
                break;
            case 4:
                {
                    savefile();
                    break;
                }
            default:
                printf("\n\n\t SORRY INVALID CHOICE!");
                printf("\n\n\t PLEASE CHOOSE FROM 1-4");
                printf("\n\n\t Do not forget to chose from 1-4");
        }
        getch();
    } while(choice != 4);
}
void details() {
    printf("\n\t enter your passport number:");
    gets(stream->passport);
    fflush(stdin);
    printf("\n\t enter your name:");
    gets(stream->name);
    fflush(stdin);
    printf("\n\t enter your email address:");
    gets(stream->email);
    fflush(stdin);
    printf("\n\t enter destination:");
    gets(stream->destination);
    fflush(stdin);
}
void details();
void reserve(int x) {
    stream = begin;
    if(begin == NULL) {
        begin = stream = (struct mufti_airline*)malloc(sizeof(struct mufti_airline));
        details();
        stream->following = NULL;
        printf("\n\t seat booking successful!");
        printf("\n\t your seat number is: seat a-%d", x);
        stream->seat_num = x;
        return;
    } else if(x > 15) {
        printf("\n\t\t seat full.");
        return;
    } else {
        while(stream->following) {
            stream = stream->following;
        }
        stream->following = (struct mufti_airline *)malloc(sizeof(struct mufti_airline));
        stream = stream->following;
        details();
        stream->following = NULL;
        printf("\n\t seat booking succesful!");
        printf("\n\t your seat number is: seat A-%d", x);
        stream->seat_num = x;
        return;
    }
}
void savefile() {
    FILE *fpointer = fopen("mufti records", "w");
    if(!fpointer) {
        printf("\n error in opening file!");
        return;
        Sleep(800);
    }
    stream = begin;
    while(stream) {
        fprintf(fpointer, "%-6s", stream->passport);
        fprintf(fpointer, "%-15s", stream->name);
        fprintf(fpointer, "%-15s", stream->email);
        fprintf(fpointer, "%-15s", stream->destination);
        fprintf(fpointer, "\n");
        stream = stream->following;
    }
    printf("\n\n\t Details have been saved to a file (mufti records)");
    fclose(fpointer);
}
void display() {
    stream = begin;
    while(stream) {
        printf("\n\n Passport Number : %-6s", stream->passport);
		printf("\n   name : %-15s", stream->name);
		printf("\n   email address: %-15s", stream->email);
		printf("\n   Seat number: A-%d", stream->seat_num);
        printf("\n   Destination:%-15s", stream->destination);
		printf("\n\n++*=====================================================*++");
        stream = stream->following;
    }
}
void cancel() {
    stream = begin;
    system("cls");
    char passport[6];
    printf("\n\nenter passport number to delete record?:");
    gets(passport);
    fflush(stdin);
    if(strcmp(begin->passport, passport) == 0) {
        dummy = begin;
        begin = begin->following;
        free(dummy);
        printf("booking has been deleted");
        Sleep(800);
        return;
    }
    while(stream->following) {
        if(strcmp(stream->following->passport, passport) == 0) {
            dummy = stream->following;
            stream->following = stream->following->following;
            free(dummy);
            printf("has been deleted");
            getch();
            Sleep(800);
            return;
        }
        stream = stream->following;
    }
    printf("passport number is wrong please check your passport");
}