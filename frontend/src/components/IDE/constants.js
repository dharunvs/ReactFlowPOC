const defaultCppCode = `class Playground{
public:
    void play(BinaryTree* obj1){
        // Write code here
    }
}`;

const defaultJavaCode = `class Playground{
    public void play(BinaryTree obj1){
        // Write code here
    }
}`;

const defaultPythonCode = `class Playground:
    def play(self, obj1):
        # Write code here`;

const defaultJsCode = `/**
* @param {BinaryTree} obj1
* @return null
*/
var play = (obj1) => {
    // Write code here
}`;

const defaultGoCode = `func play(obj1 *BinaryTree){
    // Write code here
}`;

export const languages = {
  cpp: {
    label: "C++",
    defaultCode: defaultCppCode,
  },
  java: {
    label: "Java",
    defaultCode: defaultJavaCode,
  },
  python: {
    label: "Python",
    defaultCode: defaultPythonCode,
  },
  javascript: {
    label: "Javascript",
    defaultCode: defaultJsCode,
  },
  go: {
    label: "GoLang",
    defaultCode: defaultGoCode,
  },
};
