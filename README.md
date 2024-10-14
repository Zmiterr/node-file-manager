
# List of Commands to Test File Manager Functionality

## 1. Navigation & Working Directory (nwd)
- **Go up one level**
  ```bash
  up
  ```
- **Change to a specified directory**
  ```bash
  cd path_to_directory
  ```
  _Example:_
  ```bash
  cd ./test-folder
  ```
- **List contents of the current directory as a table**
  ```bash
  ls
  ```

## 2. Basic File Operations
- **Read a file and print its content to the console (use Readable stream)**
  ```bash
  cat path_to_file
  ```
  _Example:_
  ```bash
  cat ./test-folder/example.txt
  ```
- **Create an empty file in the current directory**
  ```bash
  add new_file_name
  ```
  _Example:_
  ```bash
  add newFile.txt
  ```
- **Rename a file (content should remain unchanged)**
  ```bash
  rn path_to_file new_filename
  ```
  _Example:_
  ```bash
  rn ./test-folder/oldFile.txt newFile.txt
  ```
- **Copy a file (use Readable and Writable streams)**
  ```bash
  cp path_to_file path_to_new_directory
  ```
  _Example:_
  ```bash
  cp ./test-folder/file.txt ./another-folder/new-name.txt
  ```
- **Move a file (same as copy but the original file is deleted)**
  ```bash
  mv path_to_file path_to_new_directory
  ```
  _Example:_
  ```bash
  mv ./test-folder/file.txt ./another-folder/another-name.txt
  ```
- **Delete a file**
  ```bash
  rm path_to_file
  ```
  _Example:_
  ```bash
  rm ./test-folder/file-to-delete.txt
  ```

## 3. Operating System Info
- **Get system EOL and print it to the console**
  ```bash
  os --EOL
  ```
- **Get information about CPUs (model and clock rate in GHz)**
  ```bash
  os --cpus
  ```
- **Get home directory**
  ```bash
  os --homedir
  ```
- **Get the current system user name**
  ```bash
  os --username
  ```
- **Get the architecture of the processor**
  ```bash
  os --architecture
  ```

## 4. Hash Calculation
- **Calculate hash for a file and print it to the console**
  ```bash
  hash path_to_file
  ```
  _Example:_
  ```bash
  hash ./test-folder/example.txt
  ```

## 5. Compress and Decompress Operations
- **Compress a file (use Brotli algorithm)**
  ```bash
  compress path_to_file path_to_destination
  ```
  _Example:_
  ```bash
  compress ./test-folder/example.txt ./compressed/
  ```
- **Decompress a file (use Brotli algorithm)**
  ```bash
  decompress path_to_file path_to_destination
  ```
  _Example:_
  ```bash
  decompress ./compressed/example.txt.br ./decompressed/
  ```

## 6. Exiting the Program
- **Exit the program**
  ```bash
  .exit
  ```
  _Or press:_
  ```
  Ctrl + C
  ```

## Running the Program
1. Start the program using:
    ```bash
    npm run start -- --username=your_username
    ```
2. Test each of the commands listed above to ensure the functionality works correctly.
3. Observe the output and verify that commands are processed correctly, and errors are handled appropriately.

