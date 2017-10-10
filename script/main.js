(function(){
  var theImages = document.querySelectorAll('.image-holder'),
      theHeading = document.querySelector('.heading'),
      theSubhead = document.querySelector('.main-copy h2'),
      theSeasonText = document.querySelector('.main-copy p'),
      appliedClass;

      //I want to change all the content on the page
      function changeElements() {
        //debugger; //this is a special term that stops code execution
        let subImages = document.querySelector('.subImagesContainer');
        let objectIndex = dynamicContent[this.id];

        //remove duplicate images
        while (subImages.firstChild) {
          subImages.removeChild(subImages.firstChild);
        }
        //add the images to the bottom of the page
        objectIndex.images.forEach(function(image,index){
          //create an image element
          let newSubImg = document.createElement('img');
          // add a css class to it
          newSubImg.classList.add('thumb');
          // set the src
          newSubImg.src = "images/" + objectIndex.images[index];
          // add it to the page

          //add some data to the thumbnail
          newSubImg.dataset.index = index;

          //add some event handling
          newSubImg.addEventListener('click', function(){ popLightbox(index, objectIndex);}, false);

          subImages.appendChild(newSubImg);
        });


        //remove the colours we applied on the last click
        theSubhead.classList.remove(appliedClass);
        theHeading.classList.remove(appliedClass);

        //change the text using the values of the properties in the object
        theSubhead.firstChild.nodeValue = objectIndex.headline;
        theSeasonText.firstChild.nodeValue = objectIndex.text;

        //change the colours of season heading per click
        theSubhead.classList.add(this.id);
        theHeading.classList.add(this.id);

        appliedClass = this.id;
      }

      theImages.forEach(function(image,index){
        // add an event handler to each image
        image.addEventListener('click',changeElements, false);
      });

      //theSubhead,firstChild.nodeValue = dynamicContent['spring'].headline;
      //theSeasonText.firstChild.nodeValue = dynamicContent['spring'].text;
      //theHeading.classList.add('spirng');

      //document.querySelector('#spring').click();

      function popLightbox(currentIndex, currentObject){
        //debugger;
        let lightbox = document.querySelector('.lightbox');

        //tell window to scroll back to the top so that the lightbox covers the whole thing
        window.scrollTo(0,0);

        //grab the lightbox elements
        let lightboxImg = lightbox.querySelector('img');
        let lightboxDesc = lightbox.querySelector('p');
        let lightboxClose = lightbox.querySelector('.close-lightbox');

        //put the data in the lightbox elements
        lightboxImg.src = "images/" + currentObject.images[currentIndex];
        lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];

        lightbox.style.display = "block";

        //wire up the close lightbox button
        lightboxClose.addEventListener('click', closeLightbox, false);


      function closeLightbox() {
        //debugger;
        //reset and close the lightbox - empty the contents, reset the image src and the desc text to nothing
        lightboxImg.src = "";
        lightboxDesc.innerHTML = "";
        lightbox.style.display = "none";


      }}
      //more programmy-type way to do the same the same thing
      changeElements.call(document.querySelector('#spring'));
})
();
