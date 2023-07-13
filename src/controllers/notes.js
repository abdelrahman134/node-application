const Note = require("../model/note");
const createError = require("../utils/createError");
exports.createNote = async (req, res) => {
  try {
    const note = new Note({...req.body,assignedTo:req.user._id});
    await note.save();
    res.statuse(200).send(note);
  } catch (e) {
    next(e);
  }
};
exports.getNotes = async (req, res) => {
  try {
    const id = req.user._id;
    const role = req.user.role;
    let notes;

    if (role === "Employee") {
      notes = await Note.find({ assignedTo: userId });
      if (!notes) {
        return  next(createError(404,"note is not found"))
      }
    } else if (role === "Manager" || role === "Admin") {
      notes = await Note.find();
    }

    res.send(notes);
  } catch (e) {
    next(e)
  }
};
exports.updateNote = async (req, res) => {
  try {
    const { title, body, status } = req.body;
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (!note) {
      return next(404,"Note not found" );
    }

    if (
      note.assignedTo.toString() !== req.user._id ||
      req.user.role !== "Manager" ||
      req.user.role !== "Admin"
    ) {
      return next(401, "Unauthorized" );
    }

    note.title = title;
    note.body = body;
    note.status = status;
    note.updatedDate = Date.now();

    await note.save();
    res.statuse(200).send(note);
  } catch (e) {
      next(500,"Server error" );
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (!note) {
      return next(404,"Note not found" );
    }

    if (
      note.assignedTo.toString() !== req.user._id ||
      req.user.role !== "Manager" ||
      req.user.role !== "Admin"
    ) {
      return next(401, "Unauthorized");
    }

    await note.remove();
    res.status.send({ message: "Note deleted successfully" });
  } catch (error) {
      next(500, "Server error");
  }
};