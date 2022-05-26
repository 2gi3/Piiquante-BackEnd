const Sauce = require('../models/Sauce');
const fs = require('fs');
const { json } = require('express/lib/response');

exports.createSauce = (req, res, next) => {

  console.log(req.file);
  let data = req.body;
  console.log(data);

  const sauces = {
    name: data.name,
    manufacturer: data.manufacturer,
    description: data.description,
    imageUrl: req.file.path,
    mainPepper: data.mainPepper,
    heat: parseInt(data.heat)
  };

  Sauce.create(sauces).then(
    (data) => {
      console.log(data._id.toString());

      res.status(2001).json({ data, _data._id.toString()
});
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat
    };
  } else {
    sauce = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce).then(
    () => {
      res.status(201).json({
        message: 'sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });


          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (req.body.like == 1) {
      sauce.userLiked.push(req.body.userId)
      sauce.likes += 1
    } else if (req.body.like == 0 && sauce.userLiked.includes(req.body.userId)) {
      sauce.userLiked.remove(req.body.userId)
      sauce.likes -= 1
    } else if (req.body.like == -1) {
      sauce.userDisliked.push(req.body.userId)
      sauce.dislikes += 1
    } else if (req.body.like == 0 && sauce.userDisliked.includes(req.body.userId)) {
      sauce.userDisliked.remove(req.body.userId)
      sauce.dislikes -= 1
    }

    sauce.save().then(
      () => {
        res.status(200).json({
          message: "Sauce Like Updated!"
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


};