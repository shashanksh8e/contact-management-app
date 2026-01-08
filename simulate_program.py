#!/usr/bin/env python3

def string_length(s):
    return len(s)

def string_compare(s1, s2):
    return s1 == s2

def string_concatenate(s1, s2):
    return s1 + s2

def main():
    print("C Program Simulation")
    print("=" * 30)
    
    # Simulate input
    str1 = input("Enter first string: ")
    str2 = input("Enter second string: ")
    
    # Calculate results
    len1 = string_length(str1)
    len2 = string_length(str2)
    are_equal = string_compare(str1, str2)
    concatenated = string_concatenate(str1, str2)
    
    # Output results (matching C program format)
    print(f"Length of first string: {len1}")
    print(f"Length of second string: {len2}")
    print(f"Strings are {'equal' if are_equal else 'not equal'}.")
    print(f"Concatenated string: {concatenated}")

if __name__ == "__main__":
    main()