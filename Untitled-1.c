#include <stdio.h> 
// Function to find length of a string 
int stringLength(char *str) { 
int length = 0; 
while (str[length]) length++;  // Simplified condition 
return length; 
} 
// Function to compare two strings 
int stringCompare(char *str1, char *str2) { 
while (*str1 && (*str1 == *str2)) { str1++; str2++; } 
return *str1 == *str2;  // Direct return 
} 
// Function to concatenate two strings 
void stringConcatenate(char *str1, char *str2, char *result) { 
while (*str1) { *result++ = *str1++; }  // Directly use result++ and str1++ 
while (*str2) { *result++ = *str2++; }  // Directly use result++ and str2++ 
*result = '\0';  // Null-terminate the result string 
} 
int main() { 
char str1[100], str2[100], result[200]; 
// Input two strings 
scanf("%s %s", str1, str2); 
// Output length, comparison result, and concatenated string 
printf("Length of first string: %d\nLength of second string: %d\n", 
stringLength(str1), stringLength(str2)); 
printf("Strings are %s.\n", stringCompare(str1, str2) ? "equal" : "not equal"); 
stringConcatenate(str1, str2, result); 
printf("Concatenated string: %s\n", result); 
return 0;
}