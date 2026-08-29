# Employee Management System

class Employee:
    def __init__(self, name, position, salary):
        self.name = name.strip().capitalize()
        self.position = position.strip().capitalize()
        self.salary = salary

    def display_info(self):
        print(f"Name: {self.name}, Position: {self.position}, Salary: {self.salary}")

class Company:
    def __init__(self):
        self.employees = []

    def add_employee(self, employee):
        self.employees.append(employee)
        print(f"Added employee {employee.name}")

    def remove_employee(self, name):
        name = name.strip().capitalize()
        for employee in self.employees:
            if employee.name == name:
                self.employees.remove(employee)
                print(f"Removed employee {name}")
                return
        print(f"Employee {name} not found")

    def list_employees(self):
        print("Company Employees:")
        for employee in self.employees:
            employee.display_info()

# Interactive section
company = Company()

while True:
    print("\nOptions: 1. Add Employee  2. Remove Employee  3. List Employees  4. Exit")
    choice = input("Choose an option (1/2/3/4): ").strip()

    if choice == '1':
        name = input("Enter employee's name: ")
        position = input("Enter employee's position: ")
        salary = input("Enter employee's salary: ")
        emp = Employee(name, position, salary)
        company.add_employee(emp)

    elif choice == '2':
        name = input("Enter the name of the employee to remove: ")
        company.remove_employee(name)

    elif choice == '3':
        company.list_employees()

    elif choice == '4':
        print("Exiting the system.")
        break

    else:
        print("Invalid option. Please try again.")
