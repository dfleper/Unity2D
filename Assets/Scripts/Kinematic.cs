using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Kinematic : MonoBehaviour
{
    // Start is called before the first frame update
    private Rigidbody2D myRigidBody;
    void Start()
    {
        myRigidBody.GetComponent<Rigidbody2D>();
        myRigidBody.isKinematic = false;
    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        myRigidBody.isKinematic = true;
    }
}
