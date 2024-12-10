import { useEffect, useState } from "react";
import LocationPrompt from "../components/desktop/LocationPrompt/LocationPrompt";
import useLocation from "../hooks/location.hook";
import { useLocationSelector } from "../hooks/locationSelector.hook";
import LocationSelection from "../components/desktop/LocationSelection.tsx/LocationSelection";
import { Cloud } from "@phosphor-icons/react";
import { useActionData, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const lorem = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, ex ut condimentum porttitor, magna orci eleifend orci, in semper massa quam sit amet nisl. Morbi ac pellentesque ipsum. Nullam feugiat finibus sem ac pellentesque. Nulla scelerisque dolor metus, id ornare orci pulvinar ut. Fusce ultricies odio nulla, ut pharetra leo pharetra nec. Phasellus a justo cursus, viverra dui id, ornare lorem. Vivamus non facilisis neque. Sed posuere dapibus ligula, vitae vulputate justo lacinia eget.

In varius, arcu nec molestie aliquet, arcu tellus condimentum lacus, ac posuere orci diam id risus. Sed suscipit, odio at tempus sollicitudin, libero magna blandit magna, non euismod velit nisl nec nisl. Duis mattis ultrices nunc sit amet ultricies. Sed id turpis in enim varius faucibus. Quisque rhoncus erat urna, ut consectetur justo eleifend a. Mauris sit amet sodales lorem. Ut aliquet luctus urna non lobortis. Aliquam vel facilisis orci. Pellentesque erat nisi, blandit id auctor id, tempus eget massa. Mauris eget lectus posuere, luctus nibh a, interdum nunc. Donec at sollicitudin lacus. Donec sodales orci vitae quam rutrum, vulputate tincidunt nunc pharetra. Sed ac leo ut purus euismod volutpat in id nisi. In hac habitasse platea dictumst. Fusce cursus orci id turpis tincidunt euismod.

Integer in interdum lectus, in maximus velit. Aliquam laoreet est elit, ut aliquet velit aliquam in. Nulla tempor elementum interdum. Aliquam vel felis tincidunt, mattis elit vitae, elementum metus. Cras bibendum auctor blandit. Mauris iaculis in ante non accumsan. Proin placerat placerat congue. Phasellus aliquam tincidunt enim, maximus consequat leo laoreet vitae. Maecenas ullamcorper dictum vehicula. Maecenas sit amet egestas mauris. Phasellus in elit eget tortor laoreet sagittis. Donec scelerisque, ligula at maximus auctor, eros turpis varius dui, sed molestie arcu metus nec erat.

Ut luctus sapien metus, non suscipit enim accumsan a. Vestibulum bibendum aliquet sollicitudin. Vestibulum non odio ut ante euismod convallis. Aliquam volutpat augue eget magna mattis tempus. Aliquam a blandit augue. Sed malesuada pretium vehicula. Praesent mollis vestibulum lacus nec volutpat. Quisque feugiat urna volutpat, lacinia tellus nec, molestie arcu. Duis quis risus at felis accumsan aliquet in quis est. Cras ut condimentum felis. Sed aliquet aliquam nunc vitae semper. Aliquam sit amet orci elit.

Etiam maximus, lorem quis blandit interdum, lacus massa laoreet massa, eu tempus diam ante ut tortor. Nulla tempor pellentesque mi a molestie. Suspendisse libero libero, vestibulum in venenatis finibus, maximus ac lacus. Nullam eget mi sit amet felis hendrerit tincidunt et et nibh. Integer et diam dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed euismod ex sed porta vehicula. Vestibulum tincidunt consequat sapien, at dictum elit malesuada vitae. Nulla facilisi. Integer volutpat vulputate diam nec cursus. Vivamus at eros in sapien auctor accumsan fermentum at felis. Curabitur consectetur posuere posuere. `;

const Home = () => {
  const navigate = useNavigate();
  const [showLocationPrompt, setShowLocationPrompt] = useState<boolean>(false);
  const selector = useLocationSelector();
  const auth = useAuth();

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        setShowLocationPrompt(false);
      } else {
        setShowLocationPrompt(true);
      }
    });
  }, []);

  useEffect(() => {
    if (auth) {
      console.log(auth)
      if (auth.authenticated === false) navigate("/");
    }
  }, [auth]);
  return (
    <section className="size-full flex items-center justify-center overflow-hidden">
      <div className="border-b-2 h-12 top-0 w-full fixed z-40 flex items-center backdrop-blur-md shadow-xl shadow-black/10 bg-white/10">
        <div className="mx-4 text-2xl font-bold text-black flex gap-2 items-center">
          <Cloud weight="fill"></Cloud>OPTACLOUD
        </div>
      </div>
      <div className="text-[10vh] leading-[10vh] text-justify font-medium text-black/20 ">
        {lorem}
      </div>
      {selector?.show && <LocationSelection></LocationSelection>}
      {showLocationPrompt && <LocationPrompt></LocationPrompt>}
    </section>
  );
};

export default Home;
