import Customer from "@/models/Customer";

export async function GET(request, { params }) {
    const id = params.id;
    const customer = await Customer.findById(id)
    return Response.json(customer);
}

export async function PUT(request, { params }) {
    const id = params.id;
    const body = await request.json()
    const customer = await Customer.findByIdAndUpdate(id, body)
    return Response.json(customer)
}

export async function DELETE(request, { params }) {
    const id = params.id;
    const customer = await Customer.findByIdAndDelete(id)
    return Response.json(customer);
}