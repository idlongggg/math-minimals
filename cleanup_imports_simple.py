#!/usr/bin/env python3
import os
import re

def clean_imports_in_file(file_path):
    """
    Remove empty lines between consecutive import statements
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match import line followed by empty line followed by another import
        # This will capture multiple scenarios
        patterns_to_fix = [
            # import ... \n\nimport ...
            (r'(^import [^\n]*)\n\n(import )', r'\1\n\2'),
            # import ... \n\nfrom ...
            (r'(^import [^\n]*)\n\n(from [^\n]+ import )', r'\1\n\2'),
            # from ... \n\nimport ...
            (r'(^from [^\n]+ import [^\n]*)\n\n(import )', r'\1\n\2'),
            # from ... \n\nfrom ...
            (r'(^from [^\n]+ import [^\n]*)\n\n(from [^\n]+ import )', r'\1\n\2'),
        ]
        
        original_content = content
        
        # Apply patterns repeatedly until no more changes
        changed = True
        iterations = 0
        while changed and iterations < 10:  # Limit iterations to prevent infinite loops
            changed = False
            iterations += 1
            
            for pattern, replacement in patterns_to_fix:
                new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
                if new_content != content:
                    content = new_content
                    changed = True
        
        # Check if content actually changed from original
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
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
            print(f"✓ Cleaned imports in: {file_path}")
    
    print(f"\nSummary:")
    print(f"Total files processed: {total_files}")
    print(f"Files with changes: {files_changed}")

if __name__ == "__main__":
    main()
