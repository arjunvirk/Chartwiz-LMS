import { useEffect, useState } from "react";

import { Plus, BookOpen, Users, Pencil, Trash2, Clock3 } from "lucide-react";

import toast from "react-hot-toast";
import { motion, useReducedMotion } from "framer-motion";
import "./TeacherCourses.css";

import { useDispatch, useSelector } from "react-redux";

import {
  createCourse,
  deleteCourse,
  getTeacherCourses,
} from "../../actions/courseActions";

const TeacherCourses = () => {
  // ---------------- FORM STATE ----------------

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const reducedMotion = useReducedMotion();
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const teacherCourses = useSelector((state) => state.teacherCourses);

  const { loading, error, courses = [] } = teacherCourses;

  const [thumbnail, setThumbnail] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) return;

    dispatch(getTeacherCourses());
  }, [dispatch, userInfo]);

  // ---------------- ADD COURSE ----------------

  const submitHandler = async (e) => {
    e.preventDefault();
    if (creating) return;

    if (!title || !description || !category || !price || !thumbnail) {
      return toast.error("Please fill all fields");
    }

    if (Number(price) <= 0) {
      return toast.error("Price must be greater than 0");
    }

    try {
      new URL(thumbnail);
    } catch {
      return toast.error("Please enter a valid thumbnail URL");
    }

    setCreating(true);
    try {
      const data = await dispatch(
        createCourse({
          title,
          description,
          category,
          price: Number(price),
          thumbnail,
        }),
      );

      toast.success(data?.message || "Course created");

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setThumbnail("");

      dispatch(getTeacherCourses());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
      setDeletingId(null);
    }
  };

  // ---------------- DELETE COURSE ----------------

  const deleteCourseHandler = async (id) => {
    if (deletingId) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;
    setDeletingId(id);

    try {
      const data = await dispatch(deleteCourse(id));

      toast.success(data?.message || "Course deleted");

      dispatch(getTeacherCourses());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <motion.section className="alphira-teacher-programs" aria-labelledby="teacher-programs-title" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <header className="alphira-teacher-programs-header"><div><span className="alphira-teacher-programs-eyebrow">Teaching workspace / Programs</span><h1 id="teacher-programs-title">Build the next chapter.</h1><p>Create and manage your mentorship programs in one place.</p></div><div className="alphira-teacher-programs-count"><BookOpen size={20} aria-hidden="true" /><strong>{loading ? "…" : error ? "—" : courses.length}</strong><span>Your courses</span></div></header>
      <div className="alphira-teacher-programs-layout">
        <section className="alphira-teacher-programs-create" aria-labelledby="course-create-heading">
          <div className="alphira-teacher-programs-intro"><span className="alphira-teacher-programs-eyebrow">01 / Create</span><h2 id="course-create-heading">A new program.</h2><p>Define the course, set its fee and give students a clear introduction.</p></div>
          <form onSubmit={submitHandler} aria-busy={creating}>
            <div><label htmlFor="teacher-course-title">Course title</label><input id="teacher-course-title" type="text" placeholder="Enter course title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div><label htmlFor="teacher-course-category">Category</label><input id="teacher-course-category" type="text" placeholder="Price Action / Forex / Options" value={category} onChange={(e) => setCategory(e.target.value)} /></div>
            <div><label htmlFor="teacher-course-price">Course fee <span>INR</span></label><input id="teacher-course-price" type="number" placeholder="Enter course fee" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div><label htmlFor="teacher-course-thumbnail">Thumbnail URL</label><input id="teacher-course-thumbnail" type="text" placeholder="https://…" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />{thumbnail && <img key={thumbnail} src={thumbnail} alt="Course thumbnail preview" className="alphira-teacher-programs-preview" onError={(e) => { e.currentTarget.style.display = "none"; }} />}</div>
            <div><label htmlFor="teacher-course-description">Description</label><textarea id="teacher-course-description" rows={5} placeholder="Describe the program and what students will learn…" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
            <button type="submit" className="alphira-teacher-programs-submit" disabled={creating}><Plus size={16} aria-hidden="true" />{creating ? "Creating…" : "Create course"}</button>
          </form>
        </section>
        <section className="alphira-teacher-programs-library" aria-labelledby="course-library-heading">
          <div className="alphira-teacher-programs-library-heading"><span className="alphira-teacher-programs-eyebrow">02 / Manage</span><h2 id="course-library-heading">Your course library</h2><p>Programs assigned to your teaching account.</p></div>
          {loading ? <p className="alphira-teacher-programs-state" role="status">Loading courses…</p> : error ? <div className="alphira-teacher-programs-state" role="alert"><p>{error}</p><button type="button" onClick={() => dispatch(getTeacherCourses())}>Try again</button></div> : courses.length === 0 ? <div className="alphira-teacher-programs-state"><BookOpen size={28} aria-hidden="true" /><h3>Room for your next idea.</h3><p>Create your first mentorship course using the form.</p></div> : <div className="alphira-teacher-programs-cards">{courses.map((course) => <article key={course._id} className="alphira-teacher-programs-card"><div className="alphira-teacher-programs-card-top"><span>{course.category || "Academy program"}</span><BookOpen size={17} aria-hidden="true" /></div><h3>{course.title}</h3><div className="alphira-teacher-programs-meta"><span><Users size={14} aria-hidden="true" />{course.students?.length || 0} students</span><span><Clock3 size={14} aria-hidden="true" />{course.videos?.length || 0} lessons</span></div><div className="alphira-teacher-programs-fee"><span>Course fee</span><strong>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(course.price) || 0)}</strong></div><footer><button type="button" disabled title="Course editing is not available yet"><Pencil size={14} aria-hidden="true" />Edit unavailable</button><button type="button" className="alphira-teacher-programs-delete" disabled={!!deletingId} onClick={() => deleteCourseHandler(course._id)} aria-label={`Delete course: ${course.title}`}><Trash2 size={14} aria-hidden="true" />{deletingId === course._id ? "Deleting…" : "Delete"}</button></footer></article>)}</div>}
        </section>
      </div>
    </motion.section>
  );
};

export default TeacherCourses;
