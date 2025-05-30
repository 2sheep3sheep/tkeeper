async function Call(baseUri, useCase, dtoIn, method) {

    let response;

    try {
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
                    headers: { 
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(dtoIn)
                }
            );
        }

        const data = await response.json();

        console.log(data);

        return { ok: response.ok, status: response.status, data };
    } catch (e) {
        return { ok: false, status: "error"}
    }

}

const baseUri = "http://localhost:5000";

const FetchHelper = {
    task: {
        list: async (dtoIn) => {
            return await Call(baseUri, "task/list", dtoIn, "get")
        },
        assignSolver: async (dtoIn) => {
            return await Call(baseUri, "task/assignSolver", dtoIn, "post")
        },
        completeTask: async (dtoIn) => {
            return await Call(baseUri, "task/markAsCompleted", dtoIn, "post")
        },
        create: async (dtoIn) => {
            return await Call(baseUri, "task/create", dtoIn, "post")
        },
        remove: async (dtoIn) => {
            return await Call(baseUri, "task/delete", dtoIn, "post")
        }
    },
    solver: {
        create: async (dtoIn) => {
            return await Call(baseUri, "solver/create", dtoIn, "post")
        },
        list: async (dtoIn) => {
            return await Call(baseUri, "solver/list", null, "get")
        },
        remove: async (dtoIn) => {
            return await Call(baseUri, "solver/delete", dtoIn, "post")
        }
    }
}

export default FetchHelper;