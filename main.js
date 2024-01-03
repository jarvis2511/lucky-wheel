(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 21500; //20 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const showMsgModal = $(".notification");
  const showMsgContent = $("#notification_content");
  const buttonClose = $(".button-close");
  const listMember = $("#list_member");
  const buttonSubmit = $("#button_submit");
  const area_member = $(".area_member");
  const logodiprotech = $(".logodiprotech");
  const coating = $(".coating");
  var audio = new Audio("sound/tick.mp3");
  var clap = new Audio("sound/clap.mp3");
  //=====< Danh sách phần thưởng >=====
  var createList = [];

  buttonSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    area_member.style.display = "none";
    const inputValues = listMember.value
      .split("\n")
      .filter((item) => item.trim() !== ""); // Tách chuỗi dựa trên dấu Enter và loại bỏ các chuỗi trống

    createList = inputValues.map((text) => ({
      text: text.trim(),
    }));

    var size = createList.length;

    //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
    var rotate = 360 / size;
    var skewY = 90 - rotate;

    const test = () => {
      while (wheel.firstChild) {
        wheel.removeChild(wheel.firstChild);
      }
      if (createList.length % 2 == 1) {
        createList.push({ text: "" });
      }
      size = createList.length;

      //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
      rotate = 360 / size;

      //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
      skewY = 90 - rotate;
      createList.map((item, index) => {
        //=====< Tạo thẻ li >=====
        const elm = document.createElement("li");

        //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
        elm.style.transform = `rotate(${
          rotate * index
        }deg) skewY(-${skewY}deg)`;

        //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
        if (index % 2 == 0) {
          elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
            rotate / 2
          }deg);" class="text text-1"><b>${item.text}</b></p>`;
        } else {
          elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
            rotate / 2
          }deg);" class="text text-2"><b>${item.text}</b></p>`;
        }
        //=====< Thêm vào thẻ ul >=====
        wheel.appendChild(elm);
      });
    };
    test();
    /********** Hàm bắt đầu **********/
    const rotateWheel = (currentRotate, index) => {
      $(".wheel").style.transform = `rotate(${
        //=====< Góc quay hiện tại trừ góc của phần thưởng>=====
        //=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
        currentRotate - index * rotate - rotate / 2
      }deg)`;
    };

    const start = () => {
      audio.play();
      isRotating = true;
      //=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====

      //=====< Gọi hàm lấy phần thưởng >=====
      const gift = getGift();

      //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
      currentRotate += 360 * 10;
      var index = createList.findIndex((item) => item.text === gift.text);

      //=====< Gọi hàm quay >=====
      rotateWheel(currentRotate, index);

      //=====< Gọi hàm in ra màn hình >=====
      showGift(gift);
    };

    /********** Hàm lấy phần thưởng **********/
    const getGift = () => {
      const randomIndex = Math.floor(Math.random() * createList.length);
      if (createList[randomIndex].text == "") {
        start();
      } else return createList[randomIndex];
    };

    /********** In phần thưởng ra màn hình **********/
    const showGift = (gift) => {
      let timer = setTimeout(() => {
        isRotating = false;
        showMsgModal.style.display = "block";
        showMsgContent.innerHTML = `
        <p class="content">${gift.text}</p> 
        <div class="blue"><img src="images/giphy.gif" alt="" /></div> 
      `;
        coating.style.display = "block";
        soundClap();
        removeGiftFromList(gift);
        clearTimeout(timer);
      }, timeRotate);
    };
    const soundClap = () => {
      clap.play();
    };

    /********** Xoá phần tử ra khỏi mảng **********/
    const removeGiftFromList = (gift) => {
      var index = createList.findIndex((item) => item.text === gift.text);
      createList.splice(index, 1, { text: "" });
      test();
    };

    /********** Tắt modal **********/
    buttonClose.addEventListener("click", () => {
      clap.pause();
      coating.style.display = "none";
      showMsgModal.style.display = "none";
    });

    /********** Sự kiện click button start **********/
    wheel.addEventListener("click", () => {
      !isRotating && start();
    });

    logodiprotech.addEventListener("click", () => {
      area_member.style.display = "block";
    });
  });
})();
