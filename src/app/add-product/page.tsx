import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata ={
    title: "Додавання продуктів"
}

async function addProduct(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);
    if (!name || !description || !imageUrl || !price) {
        throw Error("Введені дані невірні або не відповідають формату!");
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price },
    });

    redirect("/")
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    return(
        <div>
            <h1 className="text-lg mb-3 font-bold">Додавання товарів</h1>
            <form action={addProduct}>
                <input
                    required
                    name="name"
                    placeholder="Назва"
                    className="mb-3 w-full input input-bordered" 
                />
                <textarea
                    required
                    name="description"
                    placeholder="Опис"
                    className="textarea-bordered textarea mb-3 w-full" 
                />
                <input
                    required
                    name="imageUrl"
                    placeholder="Посилання кртинки"
                    type="url"
                    className="mb-3 w-full input input-bordered" 
                />
                <input
                    required
                    name="price"
                    placeholder="Ціна"
                    type="number"
                    className="mb-3 w-full input input-bordered" 
                />
                <FormSubmitButton className="btn-block">Додати товар</FormSubmitButton>
            </form>
        </div>
    )
}