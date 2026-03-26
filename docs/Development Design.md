Step By Step Instruction Execution:
1. Design
2. Plan
    a) Business Plan
    b) Development Plan

The Core Tension/Mission:
    a) Human writable (friendly input side)
    b) Agent readable (unambiguous enough to generate correct code)
    c) Language agnostic (works for Python, JS, Go, whatever)

Approach: General to Detail

# MV 0 (Prototype) Plan:
    1. Terms & Requirement
        - User friendly UI/UX (Responsive, Aesthetic, and Proper)
        - There must be guidance to input/documentation through every page
        - Product must be generated according to input (mapped)
        - Product must be readable and executable (Agents friendly)
        - Program project structure must be defined and standarized
        - Specification:
            * Input/Output Standard Attribute:
                a. Layer 0
                    DATA INVOLVED (General): Project Metadata (project name, project description, language)
                    ACTIONS: Input (form), Save (button, saving Input data), View (static, unchangeable form details), Edit (reopen the form & input data | if Next has been filled, reset everything in Next Layer), Next (proceed to further input)
                b. Layer 1
                    DATA INVOLVED (Single/Project Oriented): Resources (Object), Resources Name (String of Resources) Structure/Architecture Pattern (String of Resources/Multiple Choice)
                    ACTIONS (Todo list like):
                c. Layer 2
                    DATA INVOLVED (Multi-resource/Endpoints Oriented): Endpoint (Object),
                    Url (String of Endpoint), Method (String of Endpoint), Resource (Java-Injection), Action/Description (String of Endpoint)
                    ACTIONS:
                d. Layer 3
                    DATA INVOLVED (Single/Endpoints Oriented): --Endpoint details, resources, and logic prescription
                    ACTIONS: 
            * Routing/System Schema:
                - Layer 0: Project metadata description
                - Layer 1: Project resource/entity definition
                - Layer 2: Project business process definition
                - Layer 3: Project product rules definition
            * Status Codes (default/given dictionary):
            * Data Type Choices (Canonical Type System):
                - string
                - number
                - boolean
                - object
                - array<T>
                - null
                - any
            * Ability of Prescription
    2. Goals
        - Generate an executable JSON format contain essential for project starter
    3. Product Standard (Semi-Raw)
        - JSON (semi) Schema Script
        - Product development suggestion
            * Need to be applied by additional prompt such "create" or "generate" using AI Agent
    4. R&D (Mapping development)
        - 
    5. Master Program Sample Request/Response

# MV 1 (Refined UI & Project Complexity) Plan:
    1. Terms & Requirement
    2. Goals
        - Refining ability in I/O according to program mission
        - Able to describe every detail service of the endpoints
        - Validation applied
    3. Product Standard (Semi-Raw)
        - Extra Complex JSON (semi) Schema Script

# MV 2 Plan:
    1. Terms & Requirement
    2. Goals
        - Define full description including succeed full API endpoint service
        - Dictionary of local standard (encrypted)
    3. Product Standard

# MV 3 Plan:
    1. Terms & Requirement
    2. Goals
        - Able to connect database (included)
        - AI Agent Integrated
    3. Product Standard

# MV 4 Plan:
    1. Terms & Requirement
    2. Goals
        - Self generated based on embeded AI
    3. Product Standard