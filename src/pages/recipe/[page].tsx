import Image from "next/image";

export async function getServerSideProps(context: any) {
  const { req, params } = context;
  const token = req.cookies.token || "";
  const id = params.page;
  const response = await fetch(`${process.env.API_BASE_URL}recipes?id=${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token).token}`,
    },
    next: {
      revalidate: 10,
      tags: ["recipes"],
    },
  });

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const data = await response.json();
  return {
    props: {
      recipe: data,
    },
  };
}

const ItemPreview = ({
  recipe,
}: {
  recipe: {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
  };
}) => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3">
          <Image
            width={500}
            height={500}
            src={recipe.image}
            alt={recipe.name}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/3 lg:pl-10 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold mb-4 text-primary">
            {recipe.name}
          </h1>
          <p className="text-lg  mb-4">{recipe.category}</p>
          <p className=" text-gray-600 mb-6">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
