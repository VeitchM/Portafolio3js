import { Backdrop, ContactShadows } from "@react-three/drei";
import { Themes, useTheme } from "../../providers/ThemeProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Color } from "three";

const lightColor = new Color("#ffe882");
const darkColor = new Color("#6672a3");

export default function Floor() {
  const theme = useTheme();
//   const ref = useRef<ContactShadows>(null);

//   useEffect(() => {
//     console.log("REf of contact shadows", ref);

//     gsap
//       .timeline()
//       .to(ref.current!.color, theme === Themes.dark ? darkColor : lightColor);
//   }, [theme]);

  return (
    <ContactShadows
      position={[0, -1, 0]}
      scale={25}
      blur={1}
      far={4.5}
    //   ref={ref}
      opacity={0.6}
    />
  );
  //   return (
  //     <Backdrop receiveShadow segments={10} scale={[20, 5, 5]}>
  //       <meshPhysicalMaterial roughness={1} color="#f80000" />
  //     </Backdrop>
  //   );
}
