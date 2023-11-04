export class tupleIdText {
  id:string;
  text:string
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  applyTranslation(document) {
    document.getElementById(this.id).innerHTML = this.text;
  }
}
/**This function creates an object of the form {title: str, content: {[subtitle:str,text:str[],link:{kind:link, show:str, link:str}}} from Example: 'Josefina',[['Todos los dias','TodosLosMartes','Todos los jueves'],
['OtrosDias','OtrosMiercos', "Veredas",Section.link('yo','matiasveitch@gmail.com')]]*/
function sectContent(title:string, content) {
  let allcontent = [];
  for (let j in content) {
    let subSection = content[j];
    let sub = {};
    allcontent.push(sub);
    sub.text = [];
    sub.subtitle = subSection[0];
    for (let i = 1; i < subSection.length; i++) {
      if (!subSection[i].kind) {
        sub.text.push(subSection[i]);
      } else sub.link = subSection[i];
    }
  }
  return { title: title, content: allcontent } as Section;
}

export type Section = {
  title: string;
  content: {
    subtitle: string;
    text: string[];
    link?: { link: string; show: string };
  }[];
};


function link(show, link) {
  return { kind: "link", show, link };
}

function text(text) {
  return { kind: "text", text };
}

export { sectContent, link, text };

const sectionText = {
  title: "Prueba",
  content: [
    {
      subtitle: "Cosas que hago",
      text: ["Pinto", "Me aburro de los demas"],
    },
    {
      subtitle: "Cosas que no hago",
      text: ["No Pinto", "No me aburro de los demas"],
    },
  ],
};
