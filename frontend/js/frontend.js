function FrontEnd() {
  const me = {};

  const formCreatePrompt = document.querySelector("#formCreatePrompt");

  me.showMessage = function (message, type = "danger") {
    const messagesDiv = document.querySelector("#messages");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
         <div>${message}</div>
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

    messagesDiv.append(wrapper);
  };

  me.reloadPrompts = async function () {
    const res = await fetch("/api/prompts");
    if (res.status !== 200) {
      me.showMessage("Error loading prompts");
      return;
    }
    const prompts = await res.json();

    console.log("got prompts", prompts);

    me.renderPrompts(prompts);
  };

  // Returns a callback to delete the prompt that is passed as a parameter
  function onDeletePrompt(prompt) {
    return async function () {
      const res = await fetch("/api/prompts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: prompt._id }),
      });

      if (res.ok) {
        me.showMessage("Prompt deleted", "warning");
        me.reloadPrompts();
      } else {
        me.showMessage("Error deleting prompt", "danger");
        return;
      }
    };
  }

  // Takes a prompt from the database and returns a
  // html element of it
  const renderPrompt = function (prompt) {
    const pElement = document.createElement("div");

    pElement.innerHTML = `
      <label>Prompt: ${prompt.prompt} </label>
      <label>Rating: ${prompt.rating} </label>
    `;

    const btnDeletePrompt = document.createElement("button");

    btnDeletePrompt.innerText = "🚫";
    btnDeletePrompt.classList.add("btn", "btn-outline-danger", "btn-sm");
    btnDeletePrompt.addEventListener("click", onDeletePrompt(prompt));

    pElement.appendChild(btnDeletePrompt);

    return pElement;
  };

  me.renderPrompts = function (prompts) {
    const promptsDiv = document.querySelector("#prompts");

    promptsDiv.innerHTML = "";

    for (let p of prompts) promptsDiv.appendChild(renderPrompt(p));
  };

  async function onCreatePrompt(evt) {
    // Avoids re rendering
    evt.preventDefault();

    const formData = new FormData(formCreatePrompt);
    console.log("onCreatePrompt", evt, "formData", formData);

    const res = await fetch("/api/prompts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (res.ok) {
      me.showMessage("Prompt created", "success");
      formCreatePrompt.reset();
      me.reloadPrompts();
    } else {
      me.showMessage("Error creating prompt", "danger");
    }
  }

  formCreatePrompt.addEventListener("submit", onCreatePrompt);

  return me;
}

const frontend = FrontEnd();

frontend.reloadPrompts();
