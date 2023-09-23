"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

type slug = {
  id: string;
  slug: string;
};

function Write() {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [slug, setSlug] = useState([]);
  const [postCategory, setPostCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const quillRef = useRef<any>(null);

  //let quill: any = null;

  // const QuillWithForwardedRef = forwardRef<typeof ReactQuill | null, any>(
  //   (props, ref) => <ReactQuill {...props} ref={ref} />
  // );

  // const imageHandler = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.click();

  //   // Save the cursor position
  //   let range: any = null;
  //   if (quillRef.current) {
  //     range = quillRef.current.getEditor().getSelection(true);
  //   }

  //   input.onchange = async () => {
  //     const file = input.files ? input.files[0] : null;
  //     if (file) {
  //       const storage = getStorage(app);
  //       const storageRef = ref(storage, "images/" + file.name);

  //       const uploadTask = uploadBytesResumable(storageRef, file);

  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           // Handle the upload progress
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log("Upload is " + progress + "% done");
  //         },
  //         (error) => {
  //           // Handle unsuccessful uploads
  //         },
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             if (quillRef.current && range) {
  //               quillRef.current
  //                 .getEditor()
  //                 .insertEmbed(range.index, "image", downloadURL);
  //             }
  //           });
  //         }
  //       );
  //     }
  //   };
  // };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ direction: "rtl" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    []
  );

  useEffect(() => {
    const storage = getStorage(app);

    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const upload = () => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle the error here
            console.error("Error during upload:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMedia(downloadURL);
            });
          }
        );
      };

      upload();
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!title || !value) {
      setErr(true);
    } else {
      setIsLoading(true);
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: value,
          img: media,
          catSlug: postCategory,
          slug: postCategory,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.id}`);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const categories = async () => {
      try {
        const res = await fetch("/api/categories");
        const category = await res.json();
        setSlug(category);

        // Set the first category as selected by default
        if (category.length > 0) {
          setPostCategory(category[0].slug);
          setSelectedCategory(category[0].slug);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
      }
    };

    categories();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />;
  } else {
    return (
      <div className={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className={styles.selectContainer}>
              <h2 className={styles.selectTitle}>Select a Category</h2>
              <div className={styles.optionsContainer}>
                {slug.map((item: slug) => (
                  <span
                    className={`${styles.option} ${
                      selectedCategory === item.slug ? styles.selected : ""
                    }`}
                    key={item.id}
                    onClick={() => {
                      setPostCategory(item.slug);
                      setSelectedCategory(item.slug);
                    }}
                  >
                    {item.slug}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.editor}>
              <button className={styles.button} onClick={() => setOpen(!open)}>
                <Image src="/plus.png" alt="" width={15} height={15} />
              </button>
              {open && (
                <div className={styles.add}>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                    style={{ display: "none" }}
                  />
                  <button className={styles.addButton}>
                    <label htmlFor="image" style={{ cursor: "pointer" }}>
                      <Image src="/image.png" alt="" width={15} height={15} />
                    </label>
                  </button>
                </div>
              )}
              <ReactQuill
                //ref={quillRef}
                className={styles.textArea}
                placeholder="Tell Your Story"
                value={value}
                onChange={(content, delta, source, editor) => {
                  setValue(content);
                }}
                modules={modules}
              />
            </div>
            <button className={styles.publish} onClick={handleSubmit}>
              Publish
            </button>
            <br />
            {err && (
              <span>
                To publish a blog post, you need a title and the main content.
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Write;
