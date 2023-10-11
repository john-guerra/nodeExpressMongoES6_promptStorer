function FrontEnd() {
  const me = {};

  me.showMessage = function (message, type = "danger") {
    const messagesDiv = document.querySelector("#messages");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
         <div>${message}</div>
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
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

  const renderPrompt = function (prompt) {
    return `<div>
      <label>Prompt: ${prompt.prompt} </label>
      <label>Rating: ${prompt.rating} </label>
    
    </div>`;
  };

  me.renderPrompts = function (prompts) {
    const promptsDiv = document.querySelector("#prompts");

    promptsDiv.innerHTML = prompts.map(renderPrompt).join("\n");
  };

  return me;
}

const frontend = FrontEnd();

frontend.reloadPrompts();
