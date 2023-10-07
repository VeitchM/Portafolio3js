/** Use setFunc Callback on each child of children and in the children of child recursevely */
type CouldHaveChild = { children?: CouldHaveChild[] };

export default function recursiveSet(
  children: CouldHaveChild[],
  setFunc: (child: CouldHaveChild) => void
) {
  children.forEach((child) => {
    setFunc(child);
    if (child.children) recursiveSet(child.children, setFunc);
  });
}
