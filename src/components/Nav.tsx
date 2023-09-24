import { motion} from "framer-motion";
import * as React from 'react'

export default function NavBar() {
  return (
    <nav className=" w-screen h-16 fixed bottom-0 lg:top-0 z-40">
      <motion.div
        className="bg-primary w-screen m-auto h-full   shadow-black/50 drop-shadow-lg hover:rounded-t-md hover:drop-shadow-xl transition-all rounded-t-[80px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </nav>
  );
}
