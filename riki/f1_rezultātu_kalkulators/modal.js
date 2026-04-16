let documentBody = document.body;
let Modal = undefined;

function createElement(name, classes, parent) {
  let element = document.createElement(name);

  element.className += classes;

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}

function ModalDialog() {
  let main = createElement("div", "modal", documentBody);
  let contents = createElement("div", "modal-contents", main);

  this.modalHeader = createElement("div", "modal-header", contents);
  this.modalBody = createElement("div", "modal-body", contents);
  this.modalFooter = createElement("div", "modal-footer", contents);

  this.confirmButton = createElement("button", "modal-btn modal-confirm", this.modalFooter);
  this.cancelButton = createElement("button", "modal-btn modal-cancel", this.modalFooter);

  this.show = function (raceName, drivers, options = {}) {
    let instance = this;

    instance.modalHeader.innerHTML = `<h3>Edit race ${raceName}</h3>`;
    instance.modalBody.innerHTML = `
      <label for="driverDrop">Winner: </label>
      <select id="driverDrop" name="driverDrop"></select>
    `;

    instance.confirmButton.innerHTML = "Okay";
    instance.cancelButton.innerHTML = "Close";

    const selectElement = instance.modalBody.querySelector("#driverDrop");
    selectElement.innerHTML = "";

    for (const driver of drivers ?? []) {
      const optionItem = document.createElement("option");
      optionItem.value = String(driver.driver_number ?? "");
      optionItem.textContent = driver.name
        ? `${driver.driver_number} - ${driver.name}`
        : String(driver.driver_number ?? "");
      selectElement.appendChild(optionItem);
    }

    if (options?.preselectedDriverNumber != null) {
      selectElement.value = String(options.preselectedDriverNumber);
    }

    documentBody.classList.add("modal-visible");

    return new Promise((resolve) => {
      const getCallbackByType = (type) => {
        return function () {
          const selectedOption = selectElement.selectedOptions?.[0];
          const selectedDriverNumber = selectElement.value || null;
          const selectedDriverLabel = selectedOption?.textContent || null;
          instance.hide();
          resolve({
            confirmed: type === "confirm",
            driverNumber: selectedDriverNumber,
            driverLabel: selectedDriverLabel,
          });
        };
      };

      instance.confirmCallback = getCallbackByType("confirm");
      instance.confirmButton.addEventListener("click", instance.confirmCallback);

      instance.cancelCallback = getCallbackByType("cancel");
      instance.cancelButton.addEventListener("click", instance.cancelCallback);
    });
  };

  this.hide = function () {
    documentBody.classList.remove("modal-visible");

    if (this.confirmCallback !== undefined) {
      this.confirmButton.removeEventListener("click", this.confirmCallback);
      this.confirmCallback = undefined;
    }

    if (this.cancelCallback !== undefined) {
      this.cancelButton.removeEventListener("click", this.cancelCallback);
      this.cancelCallback = undefined;
    }
  };
}

function initModal() {
  if (!Modal) Modal = new ModalDialog();
  window.Modal = Modal;
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initModal);
} else {
  initModal();
}
