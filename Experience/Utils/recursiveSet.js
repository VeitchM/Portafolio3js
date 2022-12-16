  /** Use setFunc Callback on each child of children and in the children of child recursevely */
  export default function recursiveSet (children, setFunc) {
    children.forEach(child => {
        setFunc(child);
        if (child.children)
            recursiveSet(child.children, setFunc);
    })
}