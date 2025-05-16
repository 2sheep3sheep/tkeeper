async function Call(baseUri, useCase, dtoIn, method) {

    let response;

    if (!method || method === "get") {
        if (dtoIn) {
            response = await fetch(`${baseUri}/${useCase}?${new URLSearchParams(dtoIn)}`)
        } else {
            response = await fetch(`${baseUri}/${useCase}`)
        }
    } else {
        response = await fetch(`${baseUri}/${useCase}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dtoIn)
            }
        );
    }

    const data = await response.json();

    console.log(data);

    return { ok: response.ok, status: response.status, data };

}

const baseUri = "http://localhost:5000";

const FetchHelper = {
    task: {
        list: async (dtoIn) => {
            return await Call(baseUri, "task/list", dtoIn, "get")
        }
    },
    solver: {
        list: async (dtoIn) => {
            return await Call(baseUri, "solver/list", null, "get")
        }
    }
}

export default FetchHelper;