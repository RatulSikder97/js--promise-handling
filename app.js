$("#js--image").on("change", async function (e) {
  let totalImage = document.getElementById("js--image").files.length;

  for (let i = 0; i < totalImage; i++) {
    let ll = await validateType(e.target.files[i]);
    let ll2 = await validateHW(e.target.files[i]);
    console.log(ll, "-", ll2, "/n");
  }
});

async function validateHW(currentInput) {
  const fileReader = new FileReader();
  const image = new Image();
  fileReader.readAsDataURL(currentInput);
  fileReader.onload = await function (e) {
    image.src = e.target.result;
  };

  return new Promise((res, rej) => {
    image.onload = function () {
      res(currentInput.name, this.height, this.width);
    };
  });
}

function validateType(currentFile) {
  const isAllowedExtensions =
    $.inArray(currentFile.name.split(".").pop().toUpperCase(), [
      "JPG",
      "JPEG",
      "BMP",
      "PNG",
    ]) !== -1;

  const isSizeUploadable = currentFile.size <= 512000;
  if (!isSizeUploadable) {
    return new Promise((res, rej) => {
      res("hello " + currentFile.name);
    });
  }
}
