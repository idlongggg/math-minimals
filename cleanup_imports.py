#!/usr/bin/env python3
import os
import re

def clean_imports_in_file(file_path):
    """
    Remove empty lines between import statements
    """
    try:
        print(f"Processing: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split content into lines
        lines = content.split('\n')
        
        # Find consecutive import statements and remove empty lines between them
        result_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            result_lines.append(line)
            
            # Check if current line is an import
            if line.strip().startswith(('import ', 'import{', 'import type', 'from ')) and ' import ' in line:
                # Look ahead for more imports and skip empty lines
                j = i + 1
                while j < len(lines):
                    next_line = lines[j]
                    if next_line.strip() == '':
                        # Skip empty line, check what comes after
                        k = j + 1
                        if k < len(lines) and (lines[k].strip().startswith(('import ', 'import{', 'import type', 'from ')) and ' import ' in lines[k]):
                            # Skip this empty line
                            j += 1
                            continue
                        else:
                            # Keep the empty line and break
                            result_lines.append(next_line)
                            i = j
                            break
                    elif next_line.strip().startswith(('import ', 'import{', 'import type', 'from ')) and ' import ' in next_line:
                        # Another import, add it
                        result_lines.append(next_line)
                        i = j
                        j += 1
                    else:
                        # Not an import, we're done with import block
                        i = j - 1
                        break
                else:
                    # Reached end of file
                    i = j - 1
            
            i += 1
        
        new_content = '\n'.join(result_lines)
        
        # Check if content actually changed
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✓ Changed")
            return True
        else:
            print(f"  - No changes needed")
            return False
        
    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    # Find all TypeScript and JavaScript files in src directory
    files_to_process = []
    
    # Walk through src directory
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                files_to_process.append(os.path.join(root, file))
    
    files_changed = 0
    total_files = len(files_to_process)
    
    print(f"Found {total_files} files to process...")
    
    for file_path in files_to_process:
        if clean_imports_in_file(file_path):
            files_changed += 1
            print(f"Cleaned imports in: {file_path}")
    
    print(f"\nSummary:")
    print(f"Total files processed: {total_files}")
    print(f"Files with changes: {files_changed}")

if __name__ == "__main__":
    main()
