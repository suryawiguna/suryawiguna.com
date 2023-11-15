"use client";

import Link from "next/link";
import WorkCard from "./workCard";

import Modal from "components/global/modal";
import { useState } from "react";
import Image from "next/image";

export default function Portfolios({ blok, show }: { blok: any; show?: any }) {
  const [portfolio, setPortfolio] = useState(blok.items[0]);

  return (
    <div className="flex flex-col gap-6">
      {show && show.title && (
        <h2 className="text-xl font-bold">Recent Works</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {blok.items.map((item, key) => {
          return <WorkCard key={key} work={item} setPortfolio={setPortfolio} />;
        })}
        {show && show.seeMore && (
          <Link
            href="/portfolio"
            className="flex items-center justify-center h-32 hover:scale-[0.98] transition-transform bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700
dark:text-zinc-300 rounded-2xl"
          >
            <span>Other portfolio</span>
            <i className="bx bx-right-arrow-alt text-2xl" />
          </Link>
        )}
      </div>
      <Modal>
        <Image
          src={portfolio.image.filename}
          alt=""
          width={400}
          height={200}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={`${portfolio.image.filename}/m/40x40`}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi deleniti
          animi libero rem voluptatibus eveniet odio reprehenderit, sapiente
          sequi praesentium error nobis possimus nam quaerat quidem distinctio,
          deserunt expedita maxime veniam, quo ipsa. Ducimus animi quo maxime
          sit ipsa? Ipsam vel hic laudantium itaque minima dolore nobis ea sint
          sed, architecto voluptatum, quae libero minus ullam consequatur eos,
          nostrum provident doloribus rerum nemo veritatis reiciendis? Inventore
          dolorem molestias exercitationem dolor iste velit quia repellat, id
          reiciendis in minus quod, corrupti autem ea eos. Perferendis in hic
          veniam provident reprehenderit. Fugit aut, doloremque consectetur
          commodi autem ad delectus esse nam neque.
        </p>
      </Modal>
    </div>
  );
}
