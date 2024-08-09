#include <iostream>
#include <iomanip>
#include <string>
using namespace std;
struct Project{
    string projectName;
    int numberOfParticipants;
    struct Project * next;
};
class LinkedList{
    private:
        struct Project * head;
        bool isEmpty();
        void garbageAccumulator(Project **head, int *count);
    public:
        LinkedList();
        ~LinkedList();
        bool addProject(string projectName, int numberOfParticipants);
        bool removeProject(string projectName);
        bool changeParticipantNumber(string projectName, int newNumberOfParticipants);
    void printList();
};
LinkedList::LinkedList() {
    head = NULL;
}
LinkedList::~LinkedList() {
    int x = 0;
    garbageAccumulator(&head, &x);
    cout << "the number of deleted projects is: " << x <<endl;
}
bool LinkedList::addProject(string newProjectName, int newNumberOfParticipants) {
    Project **current = &head;
    while((*current)) {
        if(newProjectName.compare((*current)->projectName) <= 0) {
            break;
        }
        current = &(*current)->next;
    }
    if((*current) != NULL) {
        if((*current)->projectName == newProjectName) {
            return 0;
        }
    }
    Project * newProject = new (nothrow) Project;
    if(newProject == 0) {
        return 0;
    }
    newProject->projectName = newProjectName;
    newProject->numberOfParticipants = newNumberOfParticipants;
    newProject->next = *current;
    *current = newProject;
    return 1;
}
bool LinkedList::removeProject(string projectName) {
    Project **curr = &head;
    while((*curr)) {
        if((*curr)->projectName == projectName) {
            Project * unlinked = (*curr);
            *curr = (*curr)->next;
            delete(unlinked);
            return 1;
        }
        curr = &(*curr)->next;
    }
    return 0;
}
bool LinkedList::changeParticipantNumber(string projectName, int newNumberOfParticipants) {
    Project **curr = &head;
    while((*curr)) {
        if((*curr)->projectName == projectName) {
            (*curr)->numberOfParticipants = newNumberOfParticipants;
            return 1;
        }
        curr = &(*curr)->next;
    }
    return 0;
}
void LinkedList::printList() {
    if(head == NULL) {
        cout << "the list is empty" << endl;
        return;
    }
    Project **current = &head;
    for(; *current; current = &(*current)->next) {
        cout << "Project Name:" << (*current)->projectName << ", ";
        cout << "Number of Participants: " << (*current)->numberOfParticipants << endl;
    }
}
void LinkedList::garbageAccumulator(Project **head, int *count) {
    if(*head == NULL) {return;}
    garbageAccumulator(&(*head)->next, count);
    delete(*head);
    *count = (*count) + 1;
}